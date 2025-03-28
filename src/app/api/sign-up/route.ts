import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request : Request) {
  await dbConnect();

  try{
    const {username,email,password}=await request.json()
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isverified : true
    })

    if(existingUserVerifiedByUsername){
        return Response.json({
            success : false,
            message : "Username already exists"
        },
        {
            status : 409
        }
    )
    }
    const existingUserByEmail = await UserModel.findOne({
        email})

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail){
        if (existingUserByEmail.isverified){
            return Response.json({
                success : false,
                message : "Email already exists"
            },
            {
                status : 409
            }
        )
        }else{
            const hasedPassword = await bcrypt.hash(password, 10);
            existingUserByEmail.password = hasedPassword;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date();
            existingUserByEmail.verifyCodeExpiry.setHours(existingUserByEmail.verifyCodeExpiry.getHours() + 1);
            await existingUserByEmail.save();
        }
    }else{
        const hasedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const newUser = new UserModel({
            username,
            email,
            password:hasedPassword,
            verifyCode,
            verifyCodeExpiry:expiryDate,
            isverified: false,
            isAcceptingMessage: true,
            messages: []
        })
        await newUser.save();
    }
    const emailResponse = await sendVerificationEmail(email,username, verifyCode)
    if(!emailResponse.success){
        return Response.json({
            success : false,
            message : emailResponse.message
        }, {status : 500}
    )}
    return Response.json({
        success : true,
        message : "User registered successfully"
    },{status : 201})


  }
    catch(error){
        console.log("error resgistering User", error);
        return Response.json({
            success : false,
            message : "Error registering User"
        },
        {
            status : 500
        }
    )
    }
}
import mongoose, {Schema, Document} from 'mongoose';


export interface Message extends Document{
    content:string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now


    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isverified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];

} 

const UserSchema: Schema<User> = new Schema({
    username :{
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        trim: true
    },
    verifyCode:{
        type: String,
        required: [true, 'Please provide a verification code']
    },
    verifyCodeExpiry:{
        type: Date,
        required: true
    },
    isverified:{
        type: Boolean,
        default: false
    }, 
    isAcceptingMessage:{
        type: Boolean,
        default: true
    },
    messages:[MessageSchema]   
})

const UserModel =(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;
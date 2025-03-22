import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
    Body,
} from '@react-email/components';

interface VerificationEmailProps {
    username : string;
    otp: string;
}

export default function VerificationEmail({username, otp}: VerificationEmailProps) {
    return (
        <Html lang="en">
            <Head>
                <Font href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
            </Head>
            <Body>
                <Section>
                    <Row>
                        <Heading>Hi {username},</Heading>
                    </Row>
                    <Row>
                        <Text>
                            Your OTP is {otp}
                        </Text>
                    </Row>
                    <Row>
                        <Button href="https://example.com/verify">Verify</Button>
                    </Row>
                    <Row>
                        If you did not request this, please ignore this email.
                    </Row>
                </Section>
            </Body>
        </Html>
    );
}
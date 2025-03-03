import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, message }) {
    try {
        if (!to || !subject || !message) {
            throw new Error("Missing required email fields");
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // `true` for port 465 (SSL), `false` for port 587 (TLS)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: `"Your App" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            text: message, // Plain text version
            html: `<p>${message}</p>`, // HTML version
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        return { success: true, info };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
}
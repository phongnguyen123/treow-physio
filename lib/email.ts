
import nodemailer from 'nodemailer';

// Define interface for email options
interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Create transporter function to allow dynamic configuration for testing
// Create transporter function to allow dynamic configuration for testing
export const createTransporter = async (user?: string, pass?: string) => {
    let smtpUser = user || process.env.SMTP_USER;
    let smtpPass = pass || process.env.SMTP_APP_PASSWORD;

    // Fallback to settings.json if not in env
    if (!smtpUser || !smtpPass) {
        try {
            // Dynamic import to avoid build-time issues if this runs on client (though it shouldn't)
            const { getSettings } = await import('@/lib/actions/settings');
            const settings = await getSettings();
            smtpUser = smtpUser || settings.email?.smtpUser;
            smtpPass = smtpPass || settings.email?.smtpPass;
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
};

// Shared sendEmail function
export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
    try {
        const transporter = await createTransporter();

        // Final check if we have auth (createTransport won't fail immediately, but sendMail will)
        // But better to check here to log clear warning
        // Note: We can't easily inspect transporter.options.auth here because of types, 
        // effectively we just try to send.

        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME || 'PhysioCare Admin'}" <${(transporter.transporter as any).auth?.user}>`, // Try to use the auth user as From
            to,
            subject,
            html,
        });
        console.log('Email sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

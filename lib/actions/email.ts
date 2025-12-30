'use server';

import { createTransporter } from '@/lib/email';

interface TestEmailInput {
    smtpUser: string;
    smtpPass: string;
    toEmail: string;
}

export async function testSmtpConnection(input: TestEmailInput) {
    const { smtpUser, smtpPass, toEmail } = input;

    if (!smtpUser || !smtpPass || !toEmail) {
        return { success: false, error: 'Vui lòng nhập đầy đủ thông tin.' };
    }

    try {
        // Create a temporary transporter with provided credentials
        const transporter = await createTransporter(smtpUser, smtpPass);

        // Verify connection configuration
        await transporter.verify();

        // Send a test email
        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME || 'PhysioCare Test'}" <${smtpUser}>`,
            to: toEmail,
            subject: 'Kiểm tra kết nối SMTP - PhysioCare',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #089191;">Kết nối SMTP thành công!</h2>
                    <p>Xin chào,</p>
                    <p>Email này được gửi để xác minh cấu hình SMTP trên hệ thống <b>PhysioCare</b>.</p>
                    <p><b>Thông tin cấu hình:</b></p>
                    <ul>
                        <li><b>SMTP User:</b> ${smtpUser}</li>
                        <li><b>Thời gian:</b> ${new Date().toLocaleString('vi-VN')}</li>
                    </ul>
                    <p style="color: green; font-weight: bold;">Hệ thống gửi mail đã hoạt động ổn định.</p>
                </div>
            `,
        });

        return { success: true, message: 'Kết nối thành công! Email kiểm tra đã được gửi.', messageId: info.messageId };
    } catch (error: any) {
        console.error('SMTP Test Error:', error);
        return { success: false, error: error.message || 'Lỗi kết nối SMTP.' };
    }
}

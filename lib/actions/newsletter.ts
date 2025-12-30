'use server';

import { getSubscribers } from './subscribers';
import { sendEmail } from '@/lib/email';

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface SendNewsletterInput {
    subject: string;
    content: string;
}

export async function sendNewsletter({ subject, content }: SendNewsletterInput): Promise<{
    success: boolean;
    sentCount: number;
    totalCount: number;
    errors: string[]
}> {
    try {
        const subscribers = await getSubscribers();
        const activeSubscribers = subscribers.filter(s => s.active); // Only send to active ones

        let sentCount = 0;
        const errors: string[] = [];

        // Simple validation
        if (!subject || !content) {
            return { success: false, sentCount: 0, totalCount: 0, errors: ['Tiêu đề và nội dung không được để trống'] };
        }

        if (activeSubscribers.length === 0) {
            return { success: false, sentCount: 0, totalCount: 0, errors: ['Chưa có người đăng ký nào'] };
        }

        // Send logic with delay
        for (const subscriber of activeSubscribers) {
            try {
                // Add Unsubscribe Link to content
                // For simplicity, we just append a text footer. Ideally, we should have a real unsubscribe link processing token.
                // Assuming we have an unsubscribe route: /unsubscribe?email=...
                const unsubscribeLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;

                const htmlWithFooter = `
                    ${content}
                    <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        Bạn nhận được email này vì đã đăng ký nhận tin từ TREOW.<br/>
                        <a href="${unsubscribeLink}" style="color: #999; text-decoration: underline;">Hủy đăng ký</a>
                    </p>
                `;

                await sendEmail({
                    to: subscriber.email,
                    subject,
                    html: htmlWithFooter
                });

                sentCount++;

                // Delay 500ms between emails to be safe with basic SMTP limits
                await delay(500);

            } catch (err: any) {
                console.error(`Failed to send to ${subscriber.email}:`, err);
                errors.push(`Lỗi gửi đến ${subscriber.email}: ${err.message}`);
            }
        }

        return {
            success: true,
            sentCount,
            totalCount: activeSubscribers.length,
            errors
        };

    } catch (error: any) {
        console.error('Error in sendNewsletter:', error);
        return {
            success: false,
            sentCount: 0,
            totalCount: 0,
            errors: [error.message || 'Lỗi hệ thống']
        };
    }
}

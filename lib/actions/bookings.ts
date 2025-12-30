'use server';

import { bookingsDb } from '@/lib/db';
import { Booking, CreateBookingInput, UpdateBookingInput } from '@/types';
import { revalidatePath } from 'next/cache';

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function getBookings(): Promise<Booking[]> {
    try {
        const bookings = await bookingsDb.getAll();
        return bookings.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}

export async function getBookingById(id: string): Promise<Booking | null> {
    try {
        return await bookingsDb.getById(id);
    } catch (error) {
        console.error('Error fetching booking:', error);
        return null;
    }
}

export async function createBooking(input: CreateBookingInput): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    try {
        // Validate required fields
        if (!input.fullName || !input.phone || !input.service || !input.date || !input.time) {
            return { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' };
        }

        // Validate phone number (basic Vietnamese phone validation)
        const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
        if (!phoneRegex.test(input.phone.replace(/\s/g, ''))) {
            return { success: false, error: 'Số điện thoại không hợp lệ' };
        }

        // Validate email if provided
        if (input.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.email)) {
                return { success: false, error: 'Email không hợp lệ' };
            }
        }

        // Validate date is not in the past
        const bookingDate = new Date(input.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (bookingDate < today) {
            return { success: false, error: 'Ngày hẹn không thể là ngày trong quá khứ' };
        }

        const booking: Booking = {
            id: generateId(),
            ...input,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await bookingsDb.create(booking);
        revalidatePath('/admin/bookings');

        // --- Send Email Notifications ---
        // We don't await this to keep the response fast for the user (fire and forget), 
        // OR we await it if we want to ensure emails sent. Let's send asynchronously but catch errors so main flow doesn't break.
        // --- Send Email Notifications ---
        // Await to ensure delivery in this environment
        try {
            const { sendEmail } = await import('@/lib/email');
            const { generateAdminBookingEmail, generateCustomerBookingEmail } = await import('@/lib/email-templates');
            const { getSettings } = await import('@/lib/actions/settings');

            const settings = await getSettings();
            const adminEmails = settings.email?.adminEmails || [];

            const emailPromises = [];

            // 1. Send to Admins
            if (adminEmails.length > 0) {
                const adminHtml = generateAdminBookingEmail(booking);
                adminEmails.forEach(email => {
                    emailPromises.push(sendEmail({
                        to: email,
                        subject: `[TREOW] Đặt lịch mới: ${booking.fullName} - ${booking.time}`,
                        html: adminHtml
                    }));
                });
            }

            // 2. Send to Customer
            if (booking.email) {
                const customerHtml = generateCustomerBookingEmail(booking);
                emailPromises.push(sendEmail({
                    to: booking.email,
                    subject: 'Xác nhận đặt lịch - Phòng khám TREOW',
                    html: customerHtml
                }));
            }

            await Promise.all(emailPromises);

        } catch (emailError) {
            console.error('Error sending booking emails:', emailError);
        }
        // --------------------------------
        // --------------------------------

        return { success: true, booking };
    } catch (error) {
        console.error('Error creating booking:', error);
        return { success: false, error: 'Không thể tạo lịch hẹn. Vui lòng thử lại.' };
    }
}

export async function updateBooking(input: UpdateBookingInput): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    try {
        const { id, ...updates } = input;

        const booking = await bookingsDb.update(id, updates);

        if (!booking) {
            return { success: false, error: 'Không tìm thấy lịch hẹn' };
        }

        revalidatePath('/admin/bookings');

        return { success: true, booking };
    } catch (error) {
        console.error('Error updating booking:', error);
        return { success: false, error: 'Không thể cập nhật lịch hẹn' };
    }
}

export async function deleteBooking(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const deleted = await bookingsDb.delete(id);

        if (!deleted) {
            return { success: false, error: 'Không tìm thấy lịch hẹn' };
        }

        revalidatePath('/admin/bookings');

        return { success: true };
    } catch (error) {
        console.error('Error deleting booking:', error);
        return { success: false, error: 'Không thể xóa lịch hẹn' };
    }
}

export async function getBookingsByStatus(status: Booking['status']): Promise<Booking[]> {
    try {
        const bookings = await bookingsDb.getAll();
        return bookings
            .filter(b => b.status === status)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
        console.error('Error fetching bookings by status:', error);
        return [];
    }
}

export async function getUpcomingBookings(): Promise<Booking[]> {
    try {
        const bookings = await bookingsDb.getAll();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return bookings
            .filter(b => {
                const bookingDate = new Date(b.date);
                return bookingDate >= today && (b.status === 'PENDING' || b.status === 'CONFIRMED');
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error('Error fetching upcoming bookings:', error);
        return [];
    }
}

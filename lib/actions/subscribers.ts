'use server';

import { revalidatePath } from 'next/cache';
import { getAllSubscribers, addSubscriber, removeSubscriber } from '@/lib/db-newsletters';

export interface Subscriber {
    id: string;
    email: string;
    subscribedAt: string;
    status: 'ACTIVE' | 'UNSUBSCRIBED';
}

export async function getSubscribers(): Promise<Subscriber[]> {
    try {
        const subscribers = await getAllSubscribers();
        // Map to match old interface
        return subscribers.map(s => ({
            id: s.id,
            email: s.email,
            subscribedAt: s.subscribedAt,
            status: s.status
        }));
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return [];
    }
}

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Email không hợp lệ' };
        }

        const result = await addSubscriber(email);

        if (result.success) {
            revalidatePath('/admin/newsletter');
        }

        return result;
    } catch (error) {
        console.error('Error subscribing:', error);
        return { success: false, error: 'Lỗi hệ thống. Vui lòng thử lại.' };
    }
}

export async function unsubscribeFromNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        const result = await removeSubscriber(email);

        if (result.success) {
            revalidatePath('/admin/newsletter');
        }

        return result;
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return { success: false, error: 'Lỗi hệ thống. Vui lòng thử lại.' };
    }
}

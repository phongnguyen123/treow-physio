'use server';

import { prisma } from '@/lib/prisma';

export interface Subscriber {
    id: string;
    email: string;
    name?: string;
    status: string;
    createdAt: string;
}

export async function getSubscribers(): Promise<Subscriber[]> {
    try {
        const subscribers = await prisma.subscriber.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return subscribers.map(s => ({
            id: s.id,
            email: s.email,
            name: s.name || undefined,
            status: s.status,
            createdAt: s.createdAt.toISOString(),
        }));
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return [];
    }
}

export async function subscribeToNewsletter(email: string, name?: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Email không hợp lệ' };
        }

        // Check if already subscribed
        const existing = await prisma.subscriber.findUnique({
            where: { email },
        });

        if (existing) {
            return { success: false, error: 'Email này đã được đăng ký' };
        }

        await prisma.subscriber.create({
            data: {
                email,
                name,
                status: 'active',
            },
        });

        return { success: true };
    } catch (error) {
        console.error('Error subscribing:', error);
        return { success: false, error: 'Lỗi hệ thống' };
    }
}

export async function unsubscribeFromNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        await prisma.subscriber.delete({
            where: { email },
        });
        return { success: true };
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return { success: false, error: 'Lỗi hệ thống' };
    }
}

'use server';

import fs from 'fs/promises';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const subscribersFilePath = path.join(dataDirectory, 'subscribers.json');

export interface Subscriber {
    id: string;
    email: string;
    createdAt: string;
    active: boolean;
}

async function ensureSubscribersFile() {
    try {
        await fs.access(subscribersFilePath);
    } catch {
        await fs.writeFile(subscribersFilePath, '[]');
    }
}

export async function getSubscribers(): Promise<Subscriber[]> {
    await ensureSubscribersFile();
    try {
        const fileContent = await fs.readFile(subscribersFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
}

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
    await ensureSubscribersFile();
    try {
        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Email không hợp lệ' };
        }

        const subscribers = await getSubscribers();

        if (subscribers.some(s => s.email === email)) {
            return { success: false, error: 'Email này đã được đăng ký' };
        }

        const newSubscriber: Subscriber = {
            id: Date.now().toString(),
            email,
            createdAt: new Date().toISOString(),
            active: true
        };

        subscribers.push(newSubscriber);
        await fs.writeFile(subscribersFilePath, JSON.stringify(subscribers, null, 2));

        return { success: true };
    } catch (error) {
        console.error('Error subscribing:', error);
        return { success: false, error: 'Lỗi hệ thống' };
    }
}

export async function unsubscribeFromNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        const subscribers = await getSubscribers();
        const updatedSubscribers = subscribers.filter(s => s.email !== email);
        await fs.writeFile(subscribersFilePath, JSON.stringify(updatedSubscribers, null, 2));
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Lỗi hệ thống' };
    }
}

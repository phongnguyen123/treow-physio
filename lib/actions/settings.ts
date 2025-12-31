'use server';

import fs from 'fs/promises';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const settingsFilePath = path.join(dataDirectory, 'settings.json');

export interface AppSettings {
    email: {
        adminEmails: string[];
        smtpUser?: string; // Optional: user might want to save it to DB instead of Env
        smtpPass?: string; // Optional
    };
}

// Helper to ensure data directory and file exist
async function ensureSettingsFile() {
    try {
        await fs.access(settingsFilePath);
    } catch {
        const defaultSettings: AppSettings = {
            email: {
                adminEmails: [],
            }
        };
        await fs.writeFile(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
    }
}

export async function getSettings(): Promise<AppSettings> {
    await ensureSettingsFile();
    try {
        const fileContent = await fs.readFile(settingsFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading settings:', error);
        return {
            email: {
                adminEmails: [],
            }
        };
    }
}

export async function updateSettings(newSettings: Partial<AppSettings>): Promise<{ success: boolean; error?: string }> {
    await ensureSettingsFile();
    try {
        const currentSettings = await getSettings();
        const updatedSettings = {
            ...currentSettings,
            ...newSettings,
            email: {
                ...currentSettings.email,
                ...(newSettings.email || {}),
            }
        };

        await fs.writeFile(settingsFilePath, JSON.stringify(updatedSettings, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: 'Failed to save settings' };
    }
}

export async function addAdminEmail(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        const settings = await getSettings();
        const emails = settings.email.adminEmails || [];

        if (!emails.includes(email)) {
            // Basic validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return { success: false, error: 'Email không hợp lệ' };
            }

            emails.push(email);
            return updateSettings({ email: { ...settings.email, adminEmails: emails } });
        }
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to add email' };
    }
}

export async function removeAdminEmail(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        const settings = await getSettings();
        const emails = settings.email.adminEmails || [];

        const newEmails = emails.filter(e => e !== email);
        return updateSettings({ email: { ...settings.email, adminEmails: newEmails } });
    } catch (error) {
        return { success: false, error: 'Failed to remove email' };
    }
}

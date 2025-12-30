import fs from 'fs/promises';
import path from 'path';

const SEO_SETTINGS_FILE = path.join(process.cwd(), 'data', 'seo-settings.json');

export interface SeoSettings {
    // Site Information
    siteName: string;
    siteUrl: string;
    siteDescription: string;
    siteKeywords: string;
    defaultLanguage: string;

    // Contact Information
    contactEmail: string;
    contactPhone: string;
    address: string;

    // Branding
    logo: string;
    favicon: string;
    ogImage: string;

    // Social Media
    twitterHandle: string;
    facebookPage: string;
    linkedinPage: string;

    // Analytics & Verification
    googleAnalyticsId: string;
    googleTagManagerId: string;
    googleSiteVerification: string;
    bingWebmasterVerification: string;
    facebookDomainVerification: string;

    // Robots & Sitemap
    robotsTxt: string;
    sitemapEnabled: boolean;
    newsSitemapEnabled: boolean;
    sitemapUpdateFrequency: string;
    maxSitemapEntries: number;

    // SEO Features
    enableStructuredData: boolean;
    enableOpenGraph: boolean;
    enableTwitterCards: boolean;
    enableCanonicalUrls: boolean;
    enableBreadcrumbs: boolean;

    // Defaults
    defaultAuthor: string;
    copyrightText: string;
    privacyPolicyUrl: string;
    termsOfServiceUrl: string;

    // Custom Code Injection
    customHeaderCode: string;
    customBodyCode: string;
    customFooterCode: string;
    inArticleAdCode: string;
    inArticleAdPosition: 'top' | 'middle' | 'bottom';

    // Metadata
    updatedAt: string;
}

export async function getSeoSettings(): Promise<SeoSettings> {
    try {
        const data = await fs.readFile(SEO_SETTINGS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading SEO settings:', error);
        // Return default settings
        return {
            siteName: 'TREOW Physiotherapy',
            siteUrl: 'https://treow.com',
            siteDescription: '',
            siteKeywords: '',
            defaultLanguage: 'vi-VN',
            contactEmail: '',
            contactPhone: '',
            address: '',
            logo: '/logo.png',
            favicon: '/favicon.ico',
            ogImage: '/og-image.jpg',
            twitterHandle: '',
            facebookPage: '',
            linkedinPage: '',
            googleAnalyticsId: '',
            googleTagManagerId: '',
            googleSiteVerification: '',
            bingWebmasterVerification: '',
            facebookDomainVerification: '',
            robotsTxt: 'User-agent: *\nAllow: /',
            sitemapEnabled: true,
            newsSitemapEnabled: true,
            sitemapUpdateFrequency: 'daily',
            maxSitemapEntries: 1000,
            enableStructuredData: true,
            enableOpenGraph: true,
            enableTwitterCards: true,
            enableCanonicalUrls: true,
            enableBreadcrumbs: true,
            defaultAuthor: 'TREOW',
            copyrightText: '© 2025 TREOW Physiotherapy. All rights reserved.',
            privacyPolicyUrl: '/chinh-sach-bao-mat',
            termsOfServiceUrl: '/dieu-khoan-dich-vu',
            customHeaderCode: '',
            customBodyCode: '',
            customFooterCode: '',
            inArticleAdCode: '',
            inArticleAdPosition: 'middle',
            updatedAt: new Date().toISOString()
        };
    }
}

export async function updateSeoSettings(settings: Partial<SeoSettings>): Promise<SeoSettings> {
    try {
        const currentSettings = await getSeoSettings();
        const updatedSettings = {
            ...currentSettings,
            ...settings,
            updatedAt: new Date().toISOString()
        };

        await fs.writeFile(
            SEO_SETTINGS_FILE,
            JSON.stringify(updatedSettings, null, 2),
            'utf-8'
        );

        return updatedSettings;
    } catch (error) {
        console.error('Error updating SEO settings:', error);
        throw error;
    }
}

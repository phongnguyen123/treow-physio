import { prisma } from '@/lib/prisma';

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

const defaultSettings: Omit<SeoSettings, 'updatedAt'> = {
    siteName: 'TREOW Physiotherapy',
    siteUrl: 'https://treowclinic.com',
    siteDescription: '',
    siteKeywords: '',
    defaultLanguage: 'vi-VN',
    contactEmail: 'contact@treowclinic.com',
    contactPhone: '+447882843513',
    address: 'Coming soon',
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
};

export async function getSeoSettings(): Promise<SeoSettings> {
    try {
        let settings = await prisma.seoSettings.findUnique({
            where: { id: 'default' },
        });

        // If no settings exist, create default
        if (!settings) {
            settings = await prisma.seoSettings.create({
                data: {
                    id: 'default',
                    siteName: defaultSettings.siteName,
                    siteUrl: defaultSettings.siteUrl,
                    siteDescription: defaultSettings.siteDescription,
                    siteKeywords: defaultSettings.siteKeywords,
                    siteLanguage: defaultSettings.defaultLanguage,
                    contactEmail: defaultSettings.contactEmail,
                    contactPhone: defaultSettings.contactPhone,
                    contactAddress: defaultSettings.address,
                    robotsTxt: defaultSettings.robotsTxt,
                    sitemapEnabled: defaultSettings.sitemapEnabled,
                    sitemapFrequency: defaultSettings.sitemapUpdateFrequency,
                    sitemapMaxEntries: defaultSettings.maxSitemapEntries,
                    structuredDataEnabled: defaultSettings.enableStructuredData,
                    openGraphEnabled: defaultSettings.enableOpenGraph,
                    twitterCardsEnabled: defaultSettings.enableTwitterCards,
                    canonicalEnabled: defaultSettings.enableCanonicalUrls,
                    breadcrumbsEnabled: defaultSettings.enableBreadcrumbs,
                },
            });
        }

        return {
            siteName: settings.siteName,
            siteUrl: settings.siteUrl,
            siteDescription: settings.siteDescription,
            siteKeywords: settings.siteKeywords,
            defaultLanguage: settings.siteLanguage,
            contactEmail: settings.contactEmail,
            contactPhone: settings.contactPhone,
            address: settings.contactAddress,
            logo: settings.brandingLogo || '/logo.png',
            favicon: settings.brandingFavicon || '/favicon.ico',
            ogImage: settings.brandingLogo || '/og-image.jpg',
            twitterHandle: settings.socialTwitter || '',
            facebookPage: settings.socialFacebook || '',
            linkedinPage: settings.socialLinkedin || '',
            googleAnalyticsId: settings.analyticsGoogleId || '',
            googleTagManagerId: settings.analyticsGtmId || '',
            googleSiteVerification: settings.verificationGoogle || '',
            bingWebmasterVerification: settings.verificationBing || '',
            facebookDomainVerification: settings.verificationFacebook || '',
            robotsTxt: settings.robotsTxt,
            sitemapEnabled: settings.sitemapEnabled,
            newsSitemapEnabled: true, // Not in schema, default true
            sitemapUpdateFrequency: settings.sitemapFrequency,
            maxSitemapEntries: settings.sitemapMaxEntries,
            enableStructuredData: settings.structuredDataEnabled,
            enableOpenGraph: settings.openGraphEnabled,
            enableTwitterCards: settings.twitterCardsEnabled,
            enableCanonicalUrls: settings.canonicalEnabled,
            enableBreadcrumbs: settings.breadcrumbsEnabled,
            defaultAuthor: settings.defaultAuthor || 'TREOW',
            copyrightText: settings.copyright || '© 2025 TREOW Physiotherapy. All rights reserved.',
            privacyPolicyUrl: settings.privacyPolicyUrl || '/chinh-sach-bao-mat',
            termsOfServiceUrl: settings.termsOfServiceUrl || '/dieu-khoan-dich-vu',
            customHeaderCode: settings.customHeaderCode || '',
            customBodyCode: settings.customBodyCode || '',
            customFooterCode: settings.customFooterCode || '',
            inArticleAdCode: settings.inArticleAdCode || '',
            inArticleAdPosition: (settings.inArticleAdPosition as 'top' | 'middle' | 'bottom') || 'middle',
            updatedAt: settings.updatedAt.toISOString(),
        };
    } catch (error) {
        console.error('Error reading SEO settings:', error);
        return {
            ...defaultSettings,
            updatedAt: new Date().toISOString(),
        };
    }
}

export async function updateSeoSettings(updates: Partial<SeoSettings>): Promise<SeoSettings> {
    try {
        const settings = await prisma.seoSettings.upsert({
            where: { id: 'default' },
            update: {
                siteName: updates.siteName,
                siteUrl: updates.siteUrl,
                siteDescription: updates.siteDescription,
                siteKeywords: updates.siteKeywords,
                siteLanguage: updates.defaultLanguage,
                contactEmail: updates.contactEmail,
                contactPhone: updates.contactPhone,
                contactAddress: updates.address,
                brandingLogo: updates.logo,
                brandingFavicon: updates.favicon,
                socialTwitter: updates.twitterHandle,
                socialFacebook: updates.facebookPage,
                socialLinkedin: updates.linkedinPage,
                analyticsGoogleId: updates.googleAnalyticsId,
                analyticsGtmId: updates.googleTagManagerId,
                verificationGoogle: updates.googleSiteVerification,
                verificationBing: updates.bingWebmasterVerification,
                verificationFacebook: updates.facebookDomainVerification,
                robotsTxt: updates.robotsTxt,
                sitemapEnabled: updates.sitemapEnabled,
                sitemapFrequency: updates.sitemapUpdateFrequency,
                sitemapMaxEntries: updates.maxSitemapEntries,
                structuredDataEnabled: updates.enableStructuredData,
                openGraphEnabled: updates.enableOpenGraph,
                twitterCardsEnabled: updates.enableTwitterCards,
                canonicalEnabled: updates.enableCanonicalUrls,
                breadcrumbsEnabled: updates.enableBreadcrumbs,
                defaultAuthor: updates.defaultAuthor,
                copyright: updates.copyrightText,
                privacyPolicyUrl: updates.privacyPolicyUrl,
                termsOfServiceUrl: updates.termsOfServiceUrl,
                customHeaderCode: updates.customHeaderCode,
                customBodyCode: updates.customBodyCode,
                customFooterCode: updates.customFooterCode,
                inArticleAdCode: updates.inArticleAdCode,
                inArticleAdPosition: updates.inArticleAdPosition,
                updatedAt: new Date(),
            },
            create: {
                id: 'default',
                siteName: defaultSettings.siteName,
                siteUrl: defaultSettings.siteUrl,
                siteDescription: defaultSettings.siteDescription,
                siteKeywords: defaultSettings.siteKeywords,
                siteLanguage: defaultSettings.defaultLanguage,
                contactEmail: defaultSettings.contactEmail,
                contactPhone: defaultSettings.contactPhone,
                contactAddress: defaultSettings.address,
                robotsTxt: defaultSettings.robotsTxt,
                sitemapEnabled: defaultSettings.sitemapEnabled,
                sitemapFrequency: defaultSettings.sitemapUpdateFrequency,
                sitemapMaxEntries: defaultSettings.maxSitemapEntries,
                structuredDataEnabled: defaultSettings.enableStructuredData,
                openGraphEnabled: defaultSettings.enableOpenGraph,
                twitterCardsEnabled: defaultSettings.enableTwitterCards,
                canonicalEnabled: defaultSettings.enableCanonicalUrls,
                breadcrumbsEnabled: defaultSettings.enableBreadcrumbs,
            },
        });

        return getSeoSettings();
    } catch (error) {
        console.error('Error updating SEO settings:', error);
        throw error;
    }
}

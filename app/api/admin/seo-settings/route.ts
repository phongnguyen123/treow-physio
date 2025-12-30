import { getSeoSettings, updateSeoSettings } from '@/lib/actions/seo-settings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const settings = await getSeoSettings();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching SEO settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch SEO settings' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const updatedSettings = await updateSeoSettings(body);
        return NextResponse.json(updatedSettings);
    } catch (error) {
        console.error('Error updating SEO settings:', error);
        return NextResponse.json(
            { error: 'Failed to update SEO settings' },
            { status: 500 }
        );
    }
}

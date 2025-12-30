import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

export const runtime = 'nodejs'; // Use nodejs runtime for fs operations

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.' }, { status: 400 });
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File size too large. Maximum 5MB allowed.' }, { status: 400 });
        }

        const filename = file.name;

        // --- OPTION 1: VERCEL BLOB (Production / Vercel) ---
        // If BLOB_READ_WRITE_TOKEN is present, use Vercel Blob
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            try {
                const blob = await put(filename, file, {
                    access: 'public',
                });
                return NextResponse.json({ url: blob.url, filename }, { status: 200 });
            } catch (blobError: any) {
                console.error('Vercel Blob Upload Error:', blobError);
                return NextResponse.json({ error: `Blob Upload Failed: ${blobError.message}` }, { status: 500 });
            }
        }

        // --- OPTION 2: LOCAL FILESYSTEM (Development) ---
        // Fallback for local development or if Blob token is missing

        // Safety check: Don't try to write to FS on Vercel if Blob token is missing
        if (process.env.VERCEL) {
            return NextResponse.json({
                error: 'Configuration Error: BLOB_READ_WRITE_TOKEN is missing on Vercel. Please add a Blob Store.'
            }, { status: 500 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename for local storage
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        const localFilename = `${timestamp}-${randomString}.${extension}`;

        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Save file
        const filepath = path.join(uploadsDir, localFilename);
        await writeFile(filepath, buffer);

        // Return URL
        const imageUrl = `/uploads/${localFilename}`;
        return NextResponse.json({ url: imageUrl, filename: localFilename }, { status: 200 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}

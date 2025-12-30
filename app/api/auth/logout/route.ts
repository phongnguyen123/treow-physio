import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (sessionToken) {
        deleteSession(sessionToken);
    }

    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_session');

    return response;
}

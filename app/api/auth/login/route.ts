import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        console.log('Login attempt:', { username, passwordLength: password?.length });

        if (!username || !password) {
            console.log('Missing credentials');
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        const isValid = verifyCredentials(username, password);
        console.log('Credentials valid:', isValid);

        if (!isValid) {
            console.log('Invalid credentials');
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create session
        const sessionToken = createSession(username);
        console.log('Session created:', sessionToken);

        // Create response with session cookie
        const response = NextResponse.json(
            { success: true, message: 'Login successful' },
            { status: 200 }
        );

        response.cookies.set('admin_session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        console.log('Cookie set, returning response');
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

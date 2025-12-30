// Simple authentication utilities - Stateless approach to fix Middleware isolation issue

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Quynhcai91@@';

// A shared secret token that verify user status
// In a real app this would be a signed JWT, but for a hardcoded single user, 
// a long random string shared between API and Middleware works perfectly.
const ADMIN_TOKEN_SECRET = 'physiocare_admin_token_secure_8821902_access';

export function verifyCredentials(username: string, password: string): boolean {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSession(username: string): string {
    // Return the fixed secret token
    return ADMIN_TOKEN_SECRET;
}

export function validateSession(token: string): boolean {
    // Simply check if the token matches our secret
    return token === ADMIN_TOKEN_SECRET;
}

export function deleteSession(token: string): void {
    // No-op for stateless
}

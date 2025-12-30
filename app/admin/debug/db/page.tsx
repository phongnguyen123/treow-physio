import { sql } from '@vercel/postgres';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

async function DebugContent() {
    const envStatus = {
        NODE_ENV: process.env.NODE_ENV,
        POSTGRES_URL_DEFINED: !!process.env.POSTGRES_URL,
        POSTGRES_USER_DEFINED: !!process.env.POSTGRES_USER,
        POSTGRES_HOST_DEFINED: !!process.env.POSTGRES_HOST,
        VERCEL_ENV: process.env.VERCEL_ENV || 'unknown',
    };

    let dbStatus = {
        success: false,
        message: '',
        timestamp: '',
        error: null as any
    };

    try {
        if (!process.env.POSTGRES_URL) {
            throw new Error('POSTGRES_URL is undefined');
        }

        const startTime = Date.now();
        // Test connection with a simple query
        const result = await sql`SELECT NOW()`;
        const duration = Date.now() - startTime;

        dbStatus = {
            success: true,
            message: `Connection successful (${duration}ms)`,
            timestamp: result.rows[0].now,
            error: null
        };
    } catch (err: any) {
        dbStatus = {
            success: false,
            message: 'Connection Failed',
            timestamp: '',
            error: err.message || err.toString()
        };
        console.error('Debug DB Error:', err);
    }

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Environment Variables</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(envStatus).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-600">{key}:</span>
                            <span className={`font-mono ${value === true ? 'text-green-600' : value === false ? 'text-red-600' : 'text-blue-600'}`}>
                                {value === true ? '✅ YES' : value === false ? '❌ NO' : String(value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`p-6 rounded-lg shadow-sm border ${dbStatus.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <h2 className={`text-xl font-bold mb-4 ${dbStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                    Database Connection Test
                </h2>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Status:</span>
                        <span className={`px-2 py-1 rounded text-sm font-bold ${dbStatus.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {dbStatus.success ? 'CONNECTED' : 'FAILED'}
                        </span>
                    </div>

                    {dbStatus.success && (
                        <>
                            <div>
                                <span className="font-semibold">Latency:</span> {dbStatus.message}
                            </div>
                            <div>
                                <span className="font-semibold">Server Time:</span> {String(dbStatus.timestamp)}
                            </div>
                        </>
                    )}

                    {!dbStatus.success && (
                        <div className="mt-4 p-4 bg-red-100 rounded text-red-900 font-mono text-sm whitespace-pre-wrap overflow-auto">
                            <strong>Error Details:</strong><br />
                            {dbStatus.error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function DebugDbPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-900">System Diagnostic</h1>
            <Suspense fallback={<div className="p-4 text-gray-500">Running diagnostics...</div>}>
                <DebugContent />
            </Suspense>
        </div>
    );
}

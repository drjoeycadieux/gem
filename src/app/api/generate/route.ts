import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';
import { GenerationRequest, ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body: GenerationRequest = await request.json();

        // Validate required fields
        if (!body.prompt || !body.businessType || !body.style) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Missing required fields: prompt, businessType, and style are required'
                },
                { status: 400 }
            );
        }

        // Check if API key is configured
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.'
                },
                { status: 500 }
            );
        }

        // Generate website using Gemini
        const websiteData = await geminiService.generateWebsite(body);

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                data: websiteData
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('API Error:', error);

        return NextResponse.json<ApiResponse>(
            {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred'
            },
            { status: 500 }
        );
    }
}

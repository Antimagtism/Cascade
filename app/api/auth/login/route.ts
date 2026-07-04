import { NextRequest, NextResponse } from "next/server";
import { login } from "@/services/auth/login";
import { checkRateLimit } from "@/lib/rateLimit";
import { LoginSchema } from "@/lib/validators/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const parsed = LoginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid request body.",
            }, { status: 400 })
        }

        const { email, password } = parsed.data;

        const ip = request.headers.get("x-real-ip") ?? 
                request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
                "unknown";

        const ipLimited = await checkRateLimit(ip);
        if (ipLimited) return ipLimited;

        const limited = await checkRateLimit(`${ip}:${email.toLowerCase()}`);
        if (limited) return limited;

        const result = await login({ email, password });

        if (!result.success) { 
            return NextResponse.json({
                success: false,
                message: result.error
            }, { status: 401 })
        }

        return NextResponse.json({
            success: true,
            user: result.user,
        }, { status: 200 })
    }

    catch {
        return NextResponse.json({
            success: false,
            message: "Invalid request body."
        }, { status: 400 })
    }
}
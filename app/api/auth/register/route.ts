import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/validators/auth/register";
import { register } from "@/services/auth/register"
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const parsed = RegisterSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({
                success: false,
                message: parsed.error.issues[0].message,

            }, { status: 400 })
        }

        const { email } = parsed.data;

        const ip = request.headers.get("x-real-ip") ?? 
                request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
                "unknown";

        const ipLimited = await checkRateLimit(ip);

        if (ipLimited) return ipLimited;

        const registerLimited = await checkRateLimit(
            `${ip}:register:${email}`
        );

        if (registerLimited) return registerLimited;

        const result = await register(parsed.data);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error,

            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Account created successfully.",
            user: result.user,

        }, { status: 201 })
    } 
    
    catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Internal server error"

        }, { status: 500 })
    }
} 
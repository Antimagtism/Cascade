import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/services/auth/logout";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-real-ip") ?? 
                request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
                "unknown";
            
        const ipLimited = await checkRateLimit(ip);
        if (ipLimited) return ipLimited;

        const result = await logout();

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error
            }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: result.message
        }, { status: 200 })
    }

    catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred during logout."
        }, { status: 500 })
    }
}
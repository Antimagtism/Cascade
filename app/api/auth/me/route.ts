import { NextResponse } from "next/server";
import { me } from "@/services/auth/me";

export async function GET() {
    try {
        const result = await me();

        if(!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error

            }, { status: 401 })
        }

        const user = result.user!;
        const profile = result.profile!;

        return NextResponse.json({
            success: true,
            
            user: {
                id: user.id,
                email: user.email,
                emailVerified: !!user.email_confirmed_at,
            },

            profile: {
                name: profile.name,
                avatarUrl: profile.avatar_url,
                createdAt: profile.created_at,
            },

        }, { status: 200 })
    }

    catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Internal server error."

        }, { status: 500 })
    }
}
import { createClient } from "@/lib/supabase/server";
import type { RegisterInput } from "@/lib/validators/auth/register";

export async function register (
    { name, email, password }: RegisterInput
) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp(
        { email, password, options: 
            { data: { name } }
        }
    )

    if (error) {
        if (error.message.includes("already registered")) {
            return {
                success: false,
                error: "An account with this email already exists.",
            };
        }

        return {
            success: false,
            error: "Failed to create account.",
        };
    }

    if (!data.user) {
        return {
            success: false,
            error: "Failed to create user.",
        }
    }

    return {
        success: true, 
        user: data.user, 
        session: data.session,
        requiresEmailVerification: data.session === null, 
    }
}
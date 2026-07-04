import { createClient } from "@/lib/supabase/server";
import { LoginInput } from "@/lib/validators/auth";

export async function login ({ email, password }: LoginInput) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword(
        { email, password }
    )

    if (error) {
        return { 
            success: false, 
            message: "Invalid email or password.", 
            error: error.message 
        }
    }

    return { 
        success: true, 
        user: data.user, 
        session: data.session
    }
}
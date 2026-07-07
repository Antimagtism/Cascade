import { createClient } from "@/lib/supabase/server";

export async function logout() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return {
            success: false,
            message: "Failed to log out.",
            error: error.message
        };
    }

    return { 
        success: true, 
        message: "Logged out successfully." 
    };
}
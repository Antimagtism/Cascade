import { createClient } from "@/lib/supabase/server";

export async function me() {
    const supabase = await createClient();

    const { data: {user}, error } = await supabase.auth.getUser();

    if (error || !user) {
        return {
            success: false,
            error: "Unauthorized."
        }
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name, avatar_url, created_at, updated_at")
        .eq("id", user.id)
        .single();
    
    if (profileError) {
        return {
            success: false,
            error: "Failed to load profile."
        }
    }

    return {
        success: true,
        user,
        profile
    }
}
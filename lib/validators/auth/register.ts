import { z } from "zod";

export const RegisterSchema = z.object({
    name: z
        .string()
        .trim()
        .min(4, "Name must be at least 4 characters long.")
        .max(50, "Name must be at most 50 characters long."),

    email: z.email().trim().toLowerCase(),

    password: z
            .string()
            .min(8, "Password must be at least 8 characters long.")
            .max(128, "Password must be at most 128 characters long.")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
            .regex(/\d/, "Password must contain at least one number.")
            .regex(/[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~]/, "Password must contain at least one special character."),

    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
})

export type RegisterInput = z.infer<typeof RegisterSchema>
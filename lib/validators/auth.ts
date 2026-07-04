import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8).max(32)
})

export type LoginInput = z.infer<typeof LoginSchema>
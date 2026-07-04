import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
});

export async function checkRateLimit(identifier: string) {
    const { 
        success, 
        limit, 
        remaining, 
        reset 
    } = await limiter.limit(identifier);

    if (!success) {
        return NextResponse.json(
            {
                success: false,
                message: "Too many requests, please try again later.",
                limit,
                remaining,
                retryAfter: Math.ceil((reset - Date.now()) / 1000),
            },
            {
                status: 429,
                headers: {
                "Retry-After": Math.ceil(
                    (reset - Date.now()) / 1000
                ).toString(),
                },
            }
        );
    }

    return null;
}
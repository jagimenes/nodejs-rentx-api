import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import { AppError } from "../../../errors/AppError";

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    enable_offline_queue: false,
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middlaware",
    points: 5, // 5 requests
    duration: 5, // per 5 second, by IP
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        await limiter.consume(request.ip);
        return next();
    } catch (e) {
        throw new AppError("Too many requests", 429);
    }
}

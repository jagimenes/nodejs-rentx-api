import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
import UsersTokensRepository from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const data = request.headers.authorization;

    if (!data) {
        throw new AppError("Empty token", 401);
    }

    const [, token] = data.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.refresh_token) as IPayload;
        /*
        const usersTokensRepository = new UsersTokensRepository();
        const user = await usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!user) {
            throw new AppError("User does not exist", 401);
        }
        */
        request.user = {
            id: user_id,
        };
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }

    return next();
}

import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

export default class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const file = request.file.filename;
        const { id } = request.user;
        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        const user = await updateUserAvatarUseCase.execute({
            user_id: id,
            avatar_file: file,
        });

        return response.status(200).json(user);
    }
}

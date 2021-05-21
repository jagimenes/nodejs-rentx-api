import { Request, Response } from "express";
import { container } from "tsyringe";

import ShowUserProfileUseCase from "./ShowUserProfileUseCase";

export default class ShowUserProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const showUserProfileUseCase = container.resolve(
            ShowUserProfileUseCase
        );

        const user = await showUserProfileUseCase.execute(id);

        return response.status(200).json(user);
    }
}

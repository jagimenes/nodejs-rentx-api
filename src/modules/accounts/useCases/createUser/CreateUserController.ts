import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserContrller {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);
        const createdUser = await createUserUseCase.execute({
            name,
            password,
            email,
            driver_license,
        });

        return response.status(201).json(createdUser);
    }
}

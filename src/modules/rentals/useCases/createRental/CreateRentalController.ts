import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRentalUseCase from "./CreateRentalUseCase";

export default class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { expected_return_date, car_id } = request.body;
        const { id } = request.user;
        const rentalsRepository = container.resolve(CreateRentalUseCase);

        const rental = await rentalsRepository.execute({
            user_id: id,
            car_id,
            expected_return_date,
        });
        return response.status(201).json(rental);
    }
}

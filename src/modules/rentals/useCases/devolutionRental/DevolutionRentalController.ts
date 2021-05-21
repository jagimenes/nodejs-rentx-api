import { Request, Response } from "express";
import { container } from "tsyringe";

import DevolutionRentalUseCase from "./DevolutionRentalUseCase";

export default class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { rental_id } = request.params;
        const rentalsRepository = container.resolve(DevolutionRentalUseCase);

        const rental = await rentalsRepository.execute(rental_id);

        return response.status(200).json(rental);
    }
}

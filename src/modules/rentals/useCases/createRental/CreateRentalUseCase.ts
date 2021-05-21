import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import DayJsDateProvider from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import ICarsRepository from "../../../cars/repositories/ICarsRepository";
import Rental from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
export default class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carOpen = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carOpen) {
            throw new AppError("Car is not avaible.");
        }

        const userOpen = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );

        if (userOpen) {
            throw new AppError("There's a rental in progress for this user.");
        }

        const compareHours = await new DayJsDateProvider().compareInHours(
            new Date(),
            expected_return_date
        );

        if (compareHours < 24) {
            throw new AppError(
                "The expected return date must be greater then 1 day."
            );
        }

        await this.carsRepository.updateAvaible(car_id, false);

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

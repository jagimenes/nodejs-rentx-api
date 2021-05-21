import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import DayJsDateProvider from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import ICarsRepository from "../../../cars/repositories/ICarsRepository";
import Rental from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
export default class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute(rental_id: string): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(rental_id);
        const car = await this.carsRepository.findById(rental.car_id);
        const daycompare = new DayJsDateProvider();
        const end_date = new Date();
        let total = 0;

        if (!rental) {
            throw new AppError("Rental does not exist");
        }

        if (rental.end_date && rental.total > 0) {
            throw new AppError("Rent is already finished.");
        }

        let daily = await daycompare.compareInDays(rental.start_date, end_date);

        if (daily <= 1) {
            daily = 1;
        }

        const delay = await daycompare.compareInDays(
            end_date,
            rental.expected_return_date
        );

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = end_date;
        rental.total = total;

        const updatedRental = await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvaible(car.id, true);

        return updatedRental;
    }
}

import IRentalDto from "../../dto/RentalDto";
import Rental from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export default class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async create(rentalDto: IRentalDto): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, rentalDto);
        rental.start_date = new Date();
        await this.rentals.push(rental);
        return rental;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.rentals.find(
            (rental) => rental.user_id === user_id && !rental.end_date
        );
        return rental;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.rentals.find(
            (rental) => rental.car_id === car_id && !rental.end_date
        );
        return rental;
    }
    async findById(id: string): Promise<Rental> {
        const rental = await this.rentals.find((rental) => rental.id === id);
        return rental;
    }
    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.rentals.filter(
            (rental) => rental.user_id === user_id
        );
        return rentals;
    }
}

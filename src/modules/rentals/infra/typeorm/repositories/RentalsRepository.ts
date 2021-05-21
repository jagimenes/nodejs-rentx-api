import { getRepository, Repository } from "typeorm";

import RentalDto from "../../../dto/RentalDto";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import Rental from "../entities/Rental";

export default class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }
    async create(rentalDto: RentalDto): Promise<Rental> {
        const rental = await this.repository.create();
        Object.assign(rental, rentalDto);
        const createdRental = await this.repository.save(rental);
        return createdRental;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            user_id,
            end_date: null,
        });
        return rental;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            car_id,
            end_date: null,
        });
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);
        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car", "user"],
        });
        return rentals;
    }
}

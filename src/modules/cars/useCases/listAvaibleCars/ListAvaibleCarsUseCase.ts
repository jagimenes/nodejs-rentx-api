import { inject, injectable } from "tsyringe";

import ICarDto from "../../dto/CarDto";
import ICarsRepository from "../../repositories/ICarsRepository";

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
}

@injectable()
export default class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({ brand, category_id, name }: IRequest): Promise<ICarDto[]> {
        const cars = await this.carsRepository.findAvaible(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

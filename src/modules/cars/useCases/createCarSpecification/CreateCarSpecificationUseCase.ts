import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import ICarDto from "../../dto/CarDto";
import ICarsRepository from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
export default class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<ICarDto> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car does not exist");
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        car.specifications = specifications;

        const specificationsCar = await this.carsRepository.create(car);

        return specificationsCar;
    }
}

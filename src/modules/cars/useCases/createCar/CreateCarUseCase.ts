import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import ICarDto from "../../dto/CarDto";
import ICarsRepository from "../../repositories/ICarsRepository";

@injectable()
export default class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute(carDto: ICarDto): Promise<ICarDto> {
        if (
            await this.carsRepository.findByLicensePlate(carDto.license_plate)
        ) {
            throw new AppError("Car already exists");
        }

        const car = await this.carsRepository.create(carDto);
        return car;
    }
}

import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import IStorageProvider from "../../../../shared/providers/StorageProvider/IStorageProvider";
import ICarsImageRepository from "../../repositories/ICarsImageRespository";
import ICarsRepository from "../../repositories/ICarsRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
export default class UploadCarImageUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}
    async execute({ car_id, images_name }: IRequest): Promise<void> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car not found", 404);
        }

        images_name.map(async (image) => {
            await this.carsImageRepository.create(car_id, image);
            await this.storageProvider.save(image, "cars");
        });
    }
}

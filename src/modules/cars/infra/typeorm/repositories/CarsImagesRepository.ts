import { getRepository, Repository } from "typeorm";

import ICarsImageRepository from "../../../repositories/ICarsImageRespository";
import CarImage from "../entities/CarImage";

export default class CarsImageRepository implements ICarsImageRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }
    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        const createdCarImage = await this.repository.save(carImage);

        return createdCarImage;
    }
}

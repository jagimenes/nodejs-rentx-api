import { getRepository, Repository } from "typeorm";

import CarDto from "../../../dto/CarDto";
import ICarsRepository from "../../../repositories/ICarsRepository";
import Car from "../entities/Car";

export default class ClassRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create(carDto: CarDto): Promise<CarDto> {
        const car = await this.repository.create();
        Object.assign(car, carDto);

        const createdCar = await this.repository.save(car);

        return createdCar;
    }
    async findByLicensePlate(licensePlate: string): Promise<CarDto> {
        const car = await this.repository.findOne({
            license_plate: licensePlate,
        });

        return car;
    }

    async findById(car_id: string): Promise<CarDto> {
        const car = await this.repository.findOne(car_id);

        return car;
    }

    async findAvaible(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<CarDto[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("cars")
            .where("avaible = :avaible", { avaible: true });

        if (brand) {
            carsQuery.andWhere("cars.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("cars.name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("cars.category_id = :category_id", {
                category_id,
            });
        }

        const cars = carsQuery.getMany();

        return cars;
    }

    async updateAvaible(car_id: string, avaible: boolean): Promise<CarDto> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ avaible })
            .where("id = :car_id")
            .setParameters({ car_id })
            .execute();

        const car = await this.findById(car_id);
        return car;
    }
}

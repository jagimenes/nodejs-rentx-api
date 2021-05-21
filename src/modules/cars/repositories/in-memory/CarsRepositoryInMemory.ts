import CarDto from "../../dto/CarDto";
import Car from "../../infra/typeorm/entities/Car";
import ICarsRepository from "../ICarsRepository";

export default class CarsRepositoryInMemory implements ICarsRepository {
    private cars: CarDto[] = [];
    async create(carDto: CarDto): Promise<CarDto> {
        const car = new Car();
        Object.assign(car, carDto);

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<CarDto> {
        return this.cars.find((car) => car.license_plate === licensePlate);
    }

    async findById(car_id: string): Promise<CarDto> {
        return this.cars.find((car) => car.id === car_id);
    }

    async findAvaible(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<CarDto[]> {
        const cars = await this.cars
            .filter((car) => car.avaible === true)
            .filter((car) => (brand ? car.brand === brand : true))
            .filter((car) =>
                category_id ? car.category_id === category_id : true
            )
            .filter((car) => (name ? car.name === name : true));

        return cars;
    }

    async updateAvaible(car_id: string, avaible: boolean): Promise<CarDto> {
        const car = await this.cars.find((car) => car.id === car_id);
        car.avaible = avaible;

        return car;
    }
}

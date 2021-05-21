import { AppError } from "../../../../shared/errors/AppError";
import ICarDto from "../../dto/CarDto";
import { ICreateSpecificationDto } from "../../dto/SpecificationDto";
import ICarsRepository from "../../repositories/ICarsRepository";
import CarsRepositoryInMemory from "../../repositories/in-memory/CarsRepositoryInMemory";
import SpecificationsRepositoryInMemory from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: ICarsRepository;
let specificationsRepository: ISpecificationsRepository;
const specificationMock: ICreateSpecificationDto = {
    name: "Hatch",
    description: "Hatch cars",
};
const carCreateMock: ICarDto = {
    name: "Cruze",
    description: "Chevrolet Cruze 1.8 LT",
    daily_rate: 450,
    license_plate: "GGG9999",
    fine_amount: 100,
    brand: "Chrevrolet",
    category_id: "",
};

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepository,
            specificationsRepository
        );
    });

    it("Should not be able to create a specification to a non existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a specification to a car", async () => {
        const car = await carsRepository.create(carCreateMock);
        const specification = await specificationsRepository.create(
            specificationMock
        );

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});

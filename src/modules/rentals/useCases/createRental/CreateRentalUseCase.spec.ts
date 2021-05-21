import { AppError } from "../../../../shared/errors/AppError";
import ICarDto from "../../../cars/dto/CarDto";
import CarsRepositoryInMemory from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import RentalsRepositoryInMemory from "../../repositories/in-memory/RentalsRepositoryInMemory";
import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;

describe("Rentals", () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        carsRepository = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            carsRepository
        );
    });
    it("Should able to create a rental", async () => {
        const carCreateMock: ICarDto = {
            name: "Cruze",
            description: "Chevrolet Cruze 1.8 LT",
            daily_rate: 450,
            license_plate: "GGG1234",
            fine_amount: 100,
            brand: "Chrevrolet",
            category_id: "",
        };

        const car = await carsRepository.create(carCreateMock);

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: new Date("2025/04/20"),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not able to create a rental with invalid return date", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12345",
                expected_return_date: new Date("2021/01/01"),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if car has an open rental", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "12345",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12345",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if user has an open rental", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "123451",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "123452",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});

import { AppError } from "../../../../shared/errors/AppError";
import ICarDto from "../../dto/CarDto";
import CarsRepositoryInMemory from "../../repositories/in-memory/CarsRepositoryInMemory";
import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
const carCreateMock: ICarDto = {
    name: "Cruze",
    description: "Chevrolet Cruze 1.8 LT",
    daily_rate: 450,
    license_plate: "GGG1234",
    fine_amount: 100,
    brand: "Chrevrolet",
    category_id: "",
};

const carCreateMock2: ICarDto = {
    name: "Cruze",
    description: "Chevrolet Cruze 1.8 LT",
    daily_rate: 450,
    license_plate: "BBB1234",
    fine_amount: 100,
    brand: "Chrevrolet",
    category_id: "",
};

const carTestDuplicateMock: ICarDto = {
    name: "Cruze",
    description: "Chevrolet Cruze 1.8 LT",
    daily_rate: 450,
    license_plate: "AAA1234",
    fine_amount: 100,
    brand: "Chrevrolet",
    category_id: "",
};
describe("Create a car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute(carCreateMock);

        expect(car).toHaveProperty("id");
        expect(car.name).toEqual(carCreateMock.name);
    });

    it("Should not be able to create two cars with the same license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute(carTestDuplicateMock);
            await createCarUseCase.execute(carTestDuplicateMock);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("The car should have avaibility, by default", async () => {
        const car = await createCarUseCase.execute(carCreateMock2);
        expect(car.avaible).toBe(true);
    });
});

import CarsRepositoryInMemory from "../../repositories/in-memory/CarsRepositoryInMemory";
import ListCarsUseCase from "./ListAvaibleCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepository: CarsRepositoryInMemory;
const carMock = {
    name: "Cruze",
    description: "Chevolet Cruze 1.8 LT",
    daily_rate: 150,
    license_plate: "AAAA-1234",
    fine_amount: 50,
    brand: "Chevrolet",
    category_id: "category_id",
};

const carMock1 = {
    name: "Civic",
    description: "Hona Civic",
    daily_rate: 150,
    license_plate: "AAAA-1235",
    fine_amount: 50,
    brand: "Honda",
    category_id: "category_id",
};

describe("List Cars", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepository);
    });

    it("Should be able to list all avaible cars", async () => {
        const car = await carsRepository.create(carMock);
        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all avaible cars with brand filter", async () => {
        const car = await carsRepository.create(carMock1);
        const cars = await listCarsUseCase.execute({ brand: "Honda" });

        expect(cars).toEqual([car]);
    });
});

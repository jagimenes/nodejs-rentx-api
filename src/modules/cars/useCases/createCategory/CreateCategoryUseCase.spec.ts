import { AppError } from "../../../../shared/errors/AppError";
import CategoriesRepositoryInMemory from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let repository: CategoriesRepositoryInMemory;
const categoryMock = {
    name: "Test Category",
    description: "Test Description",
};

describe("Create category", () => {
    beforeEach(() => {
        repository = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(repository);
    });

    it("Should be able to create a new category", async () => {
        await createCategoryUseCase.execute(categoryMock);

        const createdCategory = await repository.findByName(categoryMock.name);

        expect(createdCategory).toHaveProperty("id");
        expect(createdCategory.name).toEqual(categoryMock.name);
    });

    it("Should not be able to create a category with the same name", async () => {
        expect(async () => {
            await createCategoryUseCase.execute(categoryMock);
            await createCategoryUseCase.execute(categoryMock);
        }).rejects.toBeInstanceOf(AppError);
    });
});

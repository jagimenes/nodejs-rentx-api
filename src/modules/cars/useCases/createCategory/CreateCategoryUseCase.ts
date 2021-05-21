import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCategoryDto } from "../../dto/CategoryDto";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(
        categoryDto: ICreateCategoryDto
    ): Promise<ICreateCategoryDto> {
        const category = await this.categoriesRepository.findByName(
            categoryDto.name
        );
        if (category) {
            throw new AppError("Category already exists.");
        }
        const createdCategory = await this.categoriesRepository.create(
            categoryDto
        );
        return createdCategory;
    }
}

export { CreateCategoryUseCase };

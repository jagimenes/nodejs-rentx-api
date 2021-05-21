import { inject, injectable } from "tsyringe";

import { ICreateCategoryDto } from "../../dto/CategoryDto";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}
    async list(): Promise<ICreateCategoryDto[]> {
        const categories = await this.categoriesRepository.list();
        return categories;
    }
}

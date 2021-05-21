import { ICreateCategoryDto } from "../../dto/CategoryDto";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

export default class CategoriesRepositoryInMemory
    implements ICategoriesRepository {
    categories: Category[] = [];

    async create(categoryDto: ICreateCategoryDto): Promise<Category> {
        const category = new Category();
        Object.assign(category, categoryDto);
        this.categories.push(category);
        return category;
    }
    async list(): Promise<Category[]> {
        return this.categories;
    }
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
}

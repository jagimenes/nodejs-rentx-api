import { ICreateCategoryDto } from "../dto/CategoryDto";
import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesRepository {
    create(category: ICreateCategoryDto): Promise<Category>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}

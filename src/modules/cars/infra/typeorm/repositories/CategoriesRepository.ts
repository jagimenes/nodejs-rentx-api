import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateCategoryDto } from "../../../dto/CategoryDto";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

@EntityRepository()
class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = getRepository(Category);
    }

    /* public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }
    */

    async create(categoryDto: ICreateCategoryDto): Promise<Category> {
        const category = this.repository.create();

        Object.assign(category, categoryDto);

        const createdCategory = await this.repository.save(category);

        return createdCategory;
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };

import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICreateCategoryDto } from "../../dto/CategoryDto";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
export class ImportCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDto[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse({ delimiter: "," });
            const categories: ICreateCategoryDto[] = [];

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<ICreateCategoryDto[]> {
        const csvCategories = await this.loadCategories(file);
        const importedCategories: ICreateCategoryDto[] = [];

        const promises = csvCategories.map(async (category) => {
            const searchCategory = await this.categoriesRepository.findByName(
                category.name
            );
            if (!searchCategory) {
                const createdCategory = await this.categoriesRepository.create(
                    category
                );
                importedCategories.push(createdCategory);
            }
        });

        await Promise.all(promises);

        return importedCategories;
    }
}

import { ICreateSpecificationDto } from "../../dto/SpecificationDto";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

export default class SpecificationsRepositoryInMemory
    implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create(
        specification: ICreateSpecificationDto
    ): Promise<Specification> {
        const createSpecification = new Specification();

        Object.assign(createSpecification, specification);

        await this.specifications.push(createSpecification);

        return createSpecification;
    }
    async list(): Promise<Specification[]> {
        return this.specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specifications.find(
            (specification) => specification.name === name
        );

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = await this.specifications.filter(
            (specification) => ids.includes(specification.id)
        );

        return allSpecifications;
    }
}

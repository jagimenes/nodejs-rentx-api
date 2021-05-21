import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateSpecificationDto } from "../../../dto/SpecificationDto";
import { ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

@EntityRepository()
export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create(
        specificationDto: ICreateSpecificationDto
    ): Promise<Specification> {
        const specification = this.repository.create();
        Object.assign(specification, specificationDto);
        const createdSpecification = await this.repository.save(specification);
        return createdSpecification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async findByIds(ids: string[]): Promise<ICreateSpecificationDto[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }
}

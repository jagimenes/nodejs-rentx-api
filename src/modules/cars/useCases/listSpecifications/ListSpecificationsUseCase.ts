import { inject, injectable } from "tsyringe";

import { ICreateSpecificationDto } from "../../dto/SpecificationDto";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}
    async list(): Promise<ICreateSpecificationDto[]> {
        const specifications = await this.specificationsRepository.list();
        return specifications;
    }
}

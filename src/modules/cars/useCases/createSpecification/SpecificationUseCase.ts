import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateSpecificationDto } from "../../dto/SpecificationDto";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute(
        specificationDto: ICreateSpecificationDto
    ): Promise<ICreateSpecificationDto> {
        if (
            await this.specificationsRepository.findByName(
                specificationDto.name
            )
        ) {
            throw new AppError("Specification already exists");
        }

        const createdSpecification = await this.specificationsRepository.create(
            specificationDto
        );

        return createdSpecification;
    }
}

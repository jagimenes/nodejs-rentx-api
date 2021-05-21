import { ICreateSpecificationDto } from "../dto/SpecificationDto";

export interface ISpecificationsRepository {
    create(specification: ICreateSpecificationDto);
    list();
    findByName(name: string);
    findByIds(ids: string[]): Promise<ICreateSpecificationDto[]>;
}

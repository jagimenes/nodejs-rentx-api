import ICarDto from "../dto/CarDto";

export default interface ICarsRepository {
    create(carDto: ICarDto): Promise<ICarDto>;
    updateAvaible(car_id: string, avaible: boolean): Promise<ICarDto>;
    findByLicensePlate(licensePlate: string): Promise<ICarDto>;
    findById(car_id: string): Promise<ICarDto>;
    findAvaible(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<ICarDto[]>;
}

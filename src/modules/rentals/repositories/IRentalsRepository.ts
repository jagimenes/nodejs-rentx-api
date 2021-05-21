import IRentalDto from "../dto/RentalDto";
import Rental from "../infra/typeorm/entities/Rental";

export interface IRentalsRepository {
    create({
        user_id,
        car_id,
        expected_return_date,
    }: IRentalDto): Promise<Rental>;

    findOpenRentalByUser(user_id: string): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
}

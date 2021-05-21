export default interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): Promise<number>;
    compareInDays(start_date: Date, end_date: Date): Promise<number>;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

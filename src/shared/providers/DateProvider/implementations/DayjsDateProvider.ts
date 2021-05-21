import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import IDateProvider from "../IDateProvider";

dayjs.extend(utc);

export default class DayJsDateProvider implements IDateProvider {
    async compareInHours(start_date: Date, end_date: Date): Promise<number> {
        const expectedReturnDateFormated = dayjs(end_date)
            .utc()
            .local()
            .format();

        const nowDateFormated = dayjs(start_date).utc().local().format();

        const compare = dayjs(expectedReturnDateFormated).diff(
            nowDateFormated,
            "hours"
        );

        return compare;
    }
    async compareInDays(start_date: Date, end_date: Date): Promise<number> {
        const expectedReturnDateFormated = dayjs(end_date)
            .utc()
            .local()
            .format();

        const nowDateFormated = dayjs(start_date).utc().local().format();

        const compare = dayjs(expectedReturnDateFormated).diff(
            nowDateFormated,
            "days"
        );

        return compare;
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

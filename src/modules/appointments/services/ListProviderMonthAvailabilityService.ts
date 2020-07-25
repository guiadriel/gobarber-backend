import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isBefore } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

/**
 * [ { day: 1, available: false}, { day: 2, available: false} ]
 */

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      let available = true;

      if (isBefore(new Date(year, month - 1, day), new Date(Date.now()))) {
        available = false;
      }

      available = available && appointmentsInDay.length < 10;
      return {
        day,
        available,
      };
    });

    return availability;
    // return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;

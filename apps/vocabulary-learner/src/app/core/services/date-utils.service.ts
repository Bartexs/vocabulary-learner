import { Injectable } from '@angular/core';
import { format, addDays, parseISO, isToday, isBefore } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  getTodayDate(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  getDateWithOffsetFromDate(baseDate: string, daysToAdd: number, formatString: string): string {
    try {
      // Parse the base date
      const parsedDate = parseISO(baseDate); // Ensure the base date is in ISO format (yyyy-MM-dd)
  
      // Offset the parsed date by the specified number of days
      const targetDate = addDays(parsedDate, daysToAdd);
  
      // Format the resulting date
      return format(targetDate, formatString);
    } catch (error) {
      return ''; // Return a fallback value in case of error
    }
  }

  isTestedToday(targetDate: string): boolean {
    const today = new Date();
    const parsedDate = parseISO(targetDate); // Convert the input to a Date object
  
    if (isToday(parsedDate) || isBefore(parsedDate, today)) {
      return true;
    } 
    return false;
  }
}

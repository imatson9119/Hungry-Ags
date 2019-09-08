import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockFoodEvents } from './MockFoodEvents'
import { of, Observable } from 'rxjs';
import { FoodEvent } from './calendar/FoodEvent';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public foodEvents : FoodEvent[] = MockFoodEvents;
  public calendarEvents = [];

  getEvents() : Observable<FoodEvent[]>{
      return of(MockFoodEvents);
  }

  getCalendarEvents() {
    return of(this.calendarEvents);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockFoodEvents } from './MockFoodEvents'
import { of, Observable } from 'rxjs';
import { FoodEvent } from './calendar/FoodEvent';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public foodEvents;
  public calendarEvents = [];

  constructor(public http : HttpClient) {
    this.foodEvents = this.http.get("//127.0.0.1:5000/").subscribe(
      events =>  (this.foodEvents = events));;
  }

  getEvents() : Observable<FoodEvent[]>{
      this.foodEvents = this.http.get("//127.0.0.1:5000/").subscribe(
        events =>  (this.foodEvents = events));;
      return of(this.foodEvents);
  }

  getCalendarEvents() {
    return of(this.calendarEvents);
  }
}

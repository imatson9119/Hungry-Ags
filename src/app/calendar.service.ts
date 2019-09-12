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
    let url = "http://127.0.0.1:5000/"
    this.foodEvents = this.http.get(url).subscribe(
      events =>  (this.foodEvents = events));;
  }

  getEvents() : Observable<FoodEvent[]>{
    let url = "http://127.0.0.1:5000/"
      this.foodEvents = this.http.get(url).subscribe(
        events =>  (this.foodEvents = events));;
      return of(this.foodEvents);
  }

  getCalendarEvents() {
    return of(this.calendarEvents);
  }
}

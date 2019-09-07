import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockFoodEvents } from './MockFoodEvents'
import { of, Observable } from 'rxjs';
import { FoodEvent } from './calendar/FoodEvent';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private httpService: HttpClient) { }

  getEvents() : Observable<FoodEvent[]>{
      return of(MockFoodEvents);
  }
}

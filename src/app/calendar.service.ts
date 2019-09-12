import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockFoodEvents } from './MockFoodEvents'
import { of, Observable } from 'rxjs';
import { FoodEvent } from './calendar/FoodEvent';
import { AngularFireFunctions } from '@angular/fire/functions'
import { sendEvents } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public foodEvents;
  public calendarEvents = [];

  constructor(public firebase: AngularFireFunctions,public http : HttpClient) {
    let url = "https://us-central1-hungry-ags.cloudfunctions.net/sendEvents";
    this.foodEvents = this.http.get(url, {params:{}}).subscribe(
      events =>  (this.foodEvents = events));
  }

  getEvents() : Observable<FoodEvent[]>{
    let url = "https://us-central1-hungry-ags.cloudfunctions.net/sendEvents";
      this.foodEvents = this.http.get(url, {params:{}}).subscribe(
        events =>  (this.foodEvents = events));;
      return of(this.foodEvents);
  }

  getCalendarEvents() {
    return of(this.calendarEvents);
  }
}

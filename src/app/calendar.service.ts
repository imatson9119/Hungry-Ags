import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private httpService: HttpClient) { }

  getEvents() {
      console.log(this.httpService.get('./calendar/events.json'));
      return this.httpService.get('./calendar/events.json');
  }
}

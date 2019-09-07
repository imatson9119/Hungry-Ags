import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private httpService: HttpClient) { }

  getEvents() {
      return this.httpService.get('assets/events.json');
  }
}

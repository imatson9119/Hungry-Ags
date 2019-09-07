import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import list from '@fullcalendar/list'
import { CalendarService } from '../calendar.service'
import { FoodEvent } from './FoodEvent';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, list]; // important!
  public events : FoodEvent[];
  public calendarObjects: Object[] = [];

  constructor(private calendarService : CalendarService) { }

  ngOnInit() {
    this.calendarService.getEvents().subscribe(events => this.events = events);
    console.log("Events Length", this.events.length);
    this.calendarObjects = [];
    for(let i = 0; i < this.events.length; i++) {
      this.calendarObjects.push({title : this.events[i].eventName, date:"2019-09-07"});
    }
    console.log(this.calendarObjects[0]);
  }

}

import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import list from '@fullcalendar/list'
import { CalendarService } from '../calendar.service'
import { FoodEvent } from './FoodEvent';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, list]; // important!
  public events;

  constructor(private calendarService : CalendarService) { }

  ngOnInit() {
    //this.calendarService.getEvents().subscribe(events => this.events = events);
    this.calendarService.getEvents()
    .subscribe(events => {
        this.events = events;
    })
    console.log(this.events);
  }

}

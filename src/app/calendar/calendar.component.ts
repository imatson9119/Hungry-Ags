import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import list from '@fullcalendar/list'
import { CalendarService } from '../calendar.service'

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
    this.calendarService.getEvents().subscribe(events => this.events = events);
    /*this.events = [
      { title: 'event 1', date: '2019-09-07' },
    { title: 'event 2', date: '2019-09-08' }
    ];*/
  }

}

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
  public events : FoodEvent[];

  constructor(private calendarService : CalendarService) { }

  ngOnInit() {
    //this.calendarService.getEvents().subscribe(events => this.events = events);
    this.calendarService.getEvents()
    .subscribe(events => {
        this.events = events as FoodEvent[];
    })
    console.log(this.events);
  }

}

import { Component, OnInit } from '@angular/core';
import listPlugin from '@fullcalendar/list'
import { CalendarService } from '../calendar.service'
import { FoodEvent } from './FoodEvent';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [listPlugin]; // important!
  public events : FoodEvent[];
  public calendarObjects: Object[] = [];

  constructor(private calendarService : CalendarService) { }

  ngOnInit() {
    this.calendarService.getEvents().subscribe(events => this.events = events);
    console.log("Events Length", this.events.length);
    this.calendarObjects = [];

    //Add all events to calendar
    /*for(let i = 0; i < this.events.length; i++) {
      let color = "#6c1420";
      if(this.events[i].sanctioned) color = "#00000000";
      if(this.events[i].meetsCriteria) {
        this.calendarObjects.push({title : this.events[i].eventName,
          start:this.events[i].startTime, end:this.events[i].endTime, url:"../login",
          color:color});
      }
    }*/

    this.calendarService.getCalendarEvents().subscribe(events => this.calendarObjects = events);

    if (document.getElementsByClassName("fc-scroller").length > 0) {
      document.getElementsByClassName("fc-scroller")[0].style.height = "100%";
    }

  }

}

import { Component, OnInit, Inject } from '@angular/core';
import listPlugin from '@fullcalendar/list'
import { CalendarService } from '../calendar.service'
import { FoodEvent } from './FoodEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

export interface DialogData {

}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [listPlugin]; // important!
  public events : FoodEvent[];
  public calendarObjects: Object[] = [];
  

  constructor(private calendarService : CalendarService, public eventDialog : MatDialog) { }

  ngOnInit() {
    this.calendarService.getEvents().subscribe(events => this.events = events);
    console.log("Events Length", this.events.length);
    this.calendarObjects = [];

    this.calendarService.getCalendarEvents().subscribe(events => this.calendarObjects = events);

    if (document.getElementsByClassName("fc-scroller").length > 0) {
      document.getElementsByClassName("fc-scroller")[0].style.height = "100%";
    }

  }
}

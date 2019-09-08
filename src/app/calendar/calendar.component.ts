import { Component, OnInit, Inject } from '@angular/core';
import listPlugin from '@fullcalendar/list'
import { CalendarService } from '../calendar.service'
import { FoodEvent } from './FoodEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

export interface Data {
    title : string;
    location : string;
    description : string;
    organization : string;
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
  

  constructor(private calendarService : CalendarService, public dialog : MatDialog) { }

  ngOnInit() {
    this.calendarService.getEvents().subscribe(events => this.events = events);
    console.log("Events Length", this.events.length);
    this.calendarObjects = [];

    this.calendarService.getCalendarEvents().subscribe(events => this.calendarObjects = events);
  }

  openDialog(arg): void {
    let event = {eventName:"", location:"",description:"",organization:""};
    for (let i = 0; i < this.events.length; i++) {
      let verificationString = this.events[i].location + " - " + this.events[i].eventName;
      let selectedString = arg.event._def.title;
      if(selectedString == verificationString) {
        event = this.events[i];
        console.log("EVENT FOUND");
      }
    }

    const dialogRef = this.dialog.open(EventDialog, {
      width: '400px',
      data: {title:event.eventName,
        location:event.location, 
        description:event.description,
        organization:event.organization}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eventDialog.html',
})
export class EventDialog {

  constructor(
    public dialogRef: MatDialogRef<EventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

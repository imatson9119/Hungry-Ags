import { Component, OnInit, Inject, ComponentFactoryResolver } from "@angular/core";
import listPlugin from "@fullcalendar/list";
import { CalendarService } from "../calendar.service";
import { FoodEvent } from "./FoodEvent";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Observable } from "rxjs";
import { TouchSequence } from "selenium-webdriver";
import { buildings } from "../MockMapExtensions";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ControllerService } from "../shared/controller.service";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { MockFoodEvents } from '../MockFoodEvents';

export interface Data {
  title: string;
  organizer : string;
  location: string;
  description: string;
  organization: string;
  doLink: boolean;
  mapLink: string;
  sanctioned : boolean;
  index : number
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [listPlugin]; // important!
  public events;
  public calendarObjects: Object[] = [];
  public doLink: boolean;
  public val : String;

  constructor(
    public calendarService: CalendarService,
    public dialog: MatDialog,
    public http : HttpClient,
    public dataBase : AngularFireDatabase
  ) {}

  ngOnInit() {
      this.calendarService
        .getEvents()
        .subscribe(events => (this.events = events));

      console.log("Events Length", this.events.length);
      this.calendarObjects = [];
      this.calendarService
        .getCalendarEvents()
        .subscribe(events => (this.calendarObjects = events));
  

    /*this.calendarObjects = [];
    this.calendarObjects = MockFoodEvents;
    console.log("Calendar Length", this.calendarObjects.length);
    console.log(this.calendarObjects);
    console.log(this.calendarService.calendarEvents);*/

  }

  openDialog(arg): void {
    let eventIndex = -1;
    let event = {
      eventName: "",
      location: "",
      description: "",
      organization: "",
      user : "",
      sanctioned : false
    };
    this.events = this.calendarService.foodEvents;
    console.log("Opening dialog");
    console.log(this.events);
    for (let i = 0; i < this.events.length; i++) {
      let verificationString =
        this.events[i].location + " - " + this.events[i].eventName;
      console.log("EVENT");
        console.log(this.events[i]);
      let selectedString = arg.event._def.title;
      console.log(selectedString + " " + verificationString);
      if (selectedString == verificationString) {
        event = this.events[i];
        eventIndex = i;
        console.log("EVENT FOUND");
        console.log(event);

      } else { console.log("EVENT NOT FOUND"); }
    }

    this.doLink = false;
    let mapLink = "https://aggiemap.tamu.edu/map/d?ref=HungryAgs&BldgAbbrv=";
    for (let i = 0; i < buildings.length; i++) {
      if (event.location.indexOf(buildings[i]) != -1) {
        this.doLink = true;
        mapLink += buildings[i];
        console.log(buildings[i]);
      }
    }

    const dialogRef = this.dialog.open(EventDialog, {
      width: "400px",
      data: {
        title: event.eventName,//event.eventName,
        location: event.location,
        description: event.description,
        organization: event.organization,
        doLink: this.doLink,
        mapLink: mapLink,
        organizer : event.user,
        sanctioned : event.sanctioned,
        index : eventIndex
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
  changeHTML() {
    console.log("Changing HTML...");
    let test = document.getElementsByClassName("fc-list-empty").item(0);
    if (test) {
      console.log(test.attributes);
      test.innerHTML =
        '<i class="material-icons" style="color: rgba(0, 0, 0, 0.4); font-size: 150px;">inbox</i><br><div style="color: rgba(0, 0, 0, 0.4); font-size: 45px;">Nothing here!</div> ';
    }
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "eventDialog.html",
  styleUrls: ["eventDialog.scss"]
})
export class EventDialog {
  constructor(
    public dialogRef: MatDialogRef<EventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private _snackBar: MatSnackBar,
    public controllerService : ControllerService,
    public dataBase : AngularFireDatabase,
    public calendarService : CalendarService
      ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  reportClick() {
    this._snackBar.open("Your report has been received.", "Okay", {
      duration: 3000
    });
  }
  deleteClick(){
    //TODO
  }
  editClick() {
    let id = this.data.index;
    let eventRef : AngularFireObject<any> = this.dataBase.object('/events/' + id);
    console.log(eventRef);
    this.dataBase.list<any>('/events').snapshotChanges().subscribe((values) => { 
      values.forEach((value) => {
        console.log(value.key);
      });
    });
  }

  showMap(): boolean {
    if (this.data.doLink) return true;
    return false;
  }
}

import { Component, OnInit, Inject, ComponentFactoryResolver } from "@angular/core";
import listPlugin from "@fullcalendar/list";
import { CalendarService } from "./calendar.service";
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
import { EventLoaderService } from "../new-event/event-loader.service";
import { Router } from '@angular/router';
import { SEOService } from '../shared/seo.service';

//Data interface for dialog boxes
export interface Data {
  title: string;
  organizer : string;
  location: string;
  description: string;
  organization: string;
  doLink: boolean;
  mapLink: string;
  sanctioned : boolean;
  id : number
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [listPlugin]; // important!
  public events; //List of events retrieved from database
  public doLink: boolean; //Whether or not map link exists

  constructor(
    public calendarService: CalendarService,
    public dialog: MatDialog,
    public http : HttpClient,
    public dataBase : AngularFireDatabase,
    public seoService: SEOService,
  ) {}

  ngOnInit() {
    //Creates subscription to calendarService
      this.calendarService
        .getEvents()
        .subscribe(events => (this.events = events));
      this.seoService.updateTitle("Hungry Ags")
      this.seoService.updateDescription("Browse a selection of events containing free food posted by both Texas A&M students and organizations, or add your own to promote your own events.")
  }

  openDialog(arg): void {
    //Occurs when an event is clicked on in the calendar
    let eventIndex = -1; //Index of event in eventsList (corresponds to database index)

    let event = { //Represents event that was clicked on
      eventName: "",
      location: "",
      description: "",
      organization: "",
      user : "",
      id : Number,
      sanctioned : false
    };

    this.events = this.calendarService.foodEvents; //Gets list of events for dialog

    /*TODO: Make event finding no longer rely on location and name only (perhaps ID)*/
    for (let i = 0; i < this.events.length; i++) {
      let verificationString =
        this.events[i].location + " - " + this.events[i].eventName;

      let selectedString = arg.event._def.title;
      if (selectedString == verificationString) {
        event = this.events[i]; //Found event that was clicked on
      } else { console.log("EVENT NOT FOUND"); }
    }

    //Handles linking to AggieMap
    this.doLink = false;
    let mapLink = "https://aggiemap.tamu.edu/map/d?ref=HungryAgs&BldgAbbrv=";
    for (let i = 0; i < buildings.length; i++) {
      if (event.location.indexOf(buildings[i]) != -1) {
        this.doLink = true;
        mapLink += buildings[i];
        console.log(buildings[i]);
      }
    }

    //Opens new dialog; passes in data interface
    const dialogRef = this.dialog.open(EventDialog, {
      width: "400px",
      data: {
        title: event.eventName,
        location: event.location,
        description: event.description,
        organization: event.organization,
        doLink: this.doLink,
        mapLink: mapLink,
        organizer : event.user,
        sanctioned : event.sanctioned,
        id : event.id
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
    public calendarService : CalendarService,
    public eventLoaderService : EventLoaderService,
    public router : Router
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
    //Handles event deletion

    //Gets ID of event that was clicked on
    let id = this.data.id;
    let clickedIndex = -1;
    for(let i = 0; i < this.calendarService.foodEvents.length; i++) {
      if(this.calendarService.foodEvents[i].id == id) {
        clickedIndex = i;
        break;
      }
    }

    if(clickedIndex == -1) return; //If event was not found, do nothing

    //Finds event in the database with selected ID and removes from database
    let toDelete; //Key of value to delete
    let subscription = this.dataBase.list<any>('/events').snapshotChanges().subscribe((values) => {
      let i = 0;
      values.forEach((value) => {
        if(i == clickedIndex) {
          let remove = this.dataBase.object('/events/' + value.key);
          remove.remove();
          subscription.unsubscribe();
        }
        i++;
      });
    });
    this.dialogRef.close();
  }

  editClick() {
    //Gets ID of clicked event
    let id = this.data.id;
    let clickedEvent;
    for(let i = 0; i < this.calendarService.foodEvents.length; i++) {
      if(this.calendarService.foodEvents[i].id == id) {
        clickedEvent = this.calendarService.foodEvents[i];
        break;
      }
    }
    
    //Opens new event page with edited behavior enabled
    this.eventLoaderService.loadEvent = true; //Enables editable behavior
    this.eventLoaderService.curEvent = clickedEvent; //Event to be edited
    this.dialogRef.close();
    this.router.navigateByUrl("/new-event");
  }

  showMap(): boolean {
    if (this.data.doLink) return true;
    return false;
  }
}

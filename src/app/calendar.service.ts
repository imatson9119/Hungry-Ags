import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockFoodEvents } from './MockFoodEvents'
import { of, Observable } from 'rxjs';
import { FoodEvent } from './calendar/FoodEvent';
import { AngularFireFunctions } from '@angular/fire/functions'
import { sendEvents } from '../functions';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public foodEvents = [];
  public calendarEvents = [];
  public eventsRef : AngularFireList<any>;

  constructor(public firebase: AngularFireFunctions,public http : HttpClient, private dataBase : AngularFireDatabase) {
    /*let url = "https://us-central1-hungry-ags.cloudfunctions.net/sendEvents";
    this.foodEvents = this.http.get(url, {params:{}, observe:"response"}).subscribe(
      events =>  (this.foodEvents = events));*/
    //this.calendarEvents = MockFoodEvents;
  }

  getEvents() : Observable<FoodEvent[]>{
    console.log("Pushing dummy data to database");
    /*this.eventsRef.push({
      name: "TestPush",
      email: "TestEmail"
    });*/
    this.dataBase.list<any>('/events').valueChanges().subscribe((values) => { //NOTE: Where data is actually read from database
      this.foodEvents = [];
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) => {
        let test : FoodEvent = {
          eventName : value.eventName,
          user : value.user,
          sanctioned: value.sanctioned,
          startTime: value.startTime,
          endTime: value.endTime,
          description: value.description,
          location: value.location,
          organization: value.organization,
          meetsCriteria : true
        };
      this.foodEvents.push(test);
      });
    });

    //this.foodEvents = MockFoodEvents;
    return of(this.foodEvents);
  }

  getCalendarEvents() {
    console.log("Reading/Pushing dummy data to database");
    /*this.eventsRef.push({
      name: "TestPush",
      email: "TestEmail"
    })*/
    //this.eventsRef = this.dataBase.list<any>('\events');
    console.log("Calendar Events:");
    //console.log(this.eventsRef);
    /*this.dataBase.list<any>('/events').valueChanges().subscribe((values) => {
      this.calendarEvents = [];
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) => {
        let test = {
          eventName : value.eventName,
          user : value.user,
          sanctioned: value.sanctioned,
          startTime: value.startTime,
          endTime: value.endTime,
          description: value.description,
          location: value.location,
          organization: value.organization,
          meetsCriteria : true
        };
      this.calendarEvents.push(test);
      });
    });*/

    return of(this.calendarEvents);
  }
}

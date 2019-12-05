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
        let start = new Date(value.startTime);
        console.log("BEFORE START DATE");
        console.log(start);
        console.log(start.toJSON());
        console.log(start.getTimezoneOffset());
        let hoursDiff = start.getHours() + (start.getTimezoneOffset() / 60) - 24;
        let minutesDiff = (start.getMinutes() - start.getTimezoneOffset()) % 60;
        start.setHours(hoursDiff);
        //start.setMinutes(minutesDiff);
        console.log("AFTER START DATE");
        console.log(start);
        console.log(start.toJSON());
        console.log();
        
        let end = new Date(value.endTime);
        console.log(end.getTimezoneOffset());
        hoursDiff = end.getHours() + (end.getTimezoneOffset() / 60) - 24;
        minutesDiff = (end.getMinutes() - end.getTimezoneOffset()) % 60;
        end.setHours(hoursDiff);
        //end.setMinutes(minutesDiff);
        console.log("END DATE");
        console.log(end);
        console.log(end.toJSON());
        console.log();


        let test : FoodEvent = {
          eventName : value.eventName,
          user : value.user,
          sanctioned: value.sanctioned,
          startTime: start.toJSON(),
          endTime: end.toJSON(),
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
    /*this.eventsRef.push({
      name: "TestPush",
      email: "TestEmail"
    })*/

    return of(this.calendarEvents);
  }
}

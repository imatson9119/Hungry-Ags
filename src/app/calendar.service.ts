import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public foodEvents = []; //Handles all event data (including that not displayed on calendar)
  public calendarEvents = []; //Referenced in page head and handles data displayed on calendar
  public eventsRef : AngularFireList<any>;
  public nextID;

  constructor(public firebase: AngularFireFunctions,public http : HttpClient, private dataBase : AngularFireDatabase) {}

  getEvents() : Observable<FoodEvent[]>{
    //Gets ID of next event
    this.dataBase.object('/nextID').valueChanges().subscribe((value) => {
      this.nextID = value;
    });

    this.dataBase.list<any>('/events').valueChanges().subscribe((values) => { //NOTE: Where data is actually read from database
      this.foodEvents = [];
      // Pushes each value retrieved from database into array
      values.forEach((value) => {
        //Adjust time zone to CST
        //Start time
        let start = new Date(value.startTime);
        let hoursDiff = start.getHours() + (start.getTimezoneOffset() / 60) - 24;
        let minutesDiff = (start.getMinutes() - start.getTimezoneOffset()) % 60;
        start.setHours(hoursDiff);
        
        //End time
        let end = new Date(value.endTime);
        console.log(end.getTimezoneOffset());
        hoursDiff = end.getHours() + (end.getTimezoneOffset() / 60) - 24;
        minutesDiff = (end.getMinutes() - end.getTimezoneOffset()) % 60;
        end.setHours(hoursDiff);

        //Creates new food event to push
        let test : FoodEvent = {
          id : value.id,
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

    return of(this.foodEvents);
  }
}

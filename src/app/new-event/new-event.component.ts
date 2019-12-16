import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CalendarService } from '../calendar.service';
import { ControllerService } from '../shared/controller.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Router } from '@angular/router';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { EventLoaderService } from './event-loader.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],

})
export class NewEventComponent implements OnInit {
  //New event data fields
  public eventForm: FormGroup;
  public title : string = "";
  public location : string = "";
  public description : string = "";
  public date: Date;
  public start : string = "";
  public end : string = "";
  public organization : string = "";
  public user : string = "";
  public eventsRef : AngularFireList<any>; //Reference to editable event

  constructor(
    public router : Router, 
    public fb: FormBuilder, 
    public calendarService : CalendarService, 
    public controller : ControllerService, 
    public dataBase : AngularFireDatabase, 
    public eventLoaderService : EventLoaderService) 
    {
      this.eventsRef = this.dataBase.list<any>('\events');
    }


  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#eee',
        buttonColor: '#6c1420'
    },
    dial: {
        dialBackgroundColor: '#6c1420',
    },
    clockFace: {
        clockFaceBackgroundColor: '#fff',
        clockHandColor: '#6c1420',
        clockFaceTimeInactiveColor: '#6c1420'
    }
};

  ngOnInit() {
    //Initializes form fields
    this.eventForm = this.fb.group({
      nameControl: ['', [Validators.required]],
      orgControl: ['', Validators.required],
      locControl: ['', Validators.required],
      dateControl: ['', [Validators.required]],
      startTimeControl: ['', [Validators.required]],
      endTimeControl: ['', [Validators.required]],
      descControl: ['', [Validators.required]],
    },{validator: this.checkTimes('startTimeControl', 'endTimeControl')});
    if(this.eventLoaderService.loadEvent){
      //If event being edited, populates with events current data
      console.log(this.eventLoaderService.curEvent.startTime.substring(11,16));
      this.eventForm.setValue({
        nameControl: this.eventLoaderService.curEvent.eventName,
        orgControl: this.eventLoaderService.curEvent.organization,
        locControl: this.eventLoaderService.curEvent.location,
        dateControl: new Date(this.eventLoaderService.curEvent.startTime),
        startTimeControl: this.parseTime(this.eventLoaderService.curEvent.startTime), //TODO: Parse times
        endTimeControl: this.parseTime(this.eventLoaderService.curEvent.endTime), //TODO: Parse times
        descControl: this.eventLoaderService.curEvent.description
      })
      
    }
    if(this.controller.orgName != ''){
      this.eventForm.controls.orgControl.setValue(this.controller.orgName);
      this.eventForm.controls.orgControl.disable();
    }
  }
  ngOnDestroy() {
    this.eventLoaderService.loadEvent = false;
  }

  parseTime(formatted : string) {
    //Takes JSON formatted string and parses it back into displayable format
    //i.e. input is something like "2019-09-08T18:00:00+00:00", output is something like "8:23 PM"
    formatted = formatted.slice(11, 11 + 5);
    let suffix = "AM";
    let date = new Date();
    let timezoneOffset = date.getTimezoneOffset();
    let hours = Number(formatted.slice(0, 2)); //Get hour representation as an integer
    let minutes = formatted.slice(3, 5); //Get minute representation as an integer

    hours = (hours + 12 + (timezoneOffset / 60));
    if(hours % 24 >= 12) suffix = "PM";
    hours = hours % 12;

    let finalTime : string = hours + ":" + minutes + " " + suffix;
    return finalTime;
  }

  checkTimes(start: string, end: string) {
    //Ensures start time is before end time
    return (group: FormGroup) => {
      
      let startTime = group.controls[start],
          endTime = group.controls[end];
      if(startTime.value == '' || endTime.value == '')
        return endTime.setErrors(null);
      let st = this.formatTime(startTime.value), et = this.formatTime(endTime.value);
      if (st[0] > et[0] || (st[0] == et[0] && st[1] > et[1])) {
        return endTime.setErrors({notLogical: true})
      }
      else {
        return endTime.setErrors(null);
      }
    }
  }

  formatTime(time: string){
    //Parses time into military time [hours, minutes]
    let timeNum = time.split(' ');
    let mins = +timeNum[0].split(':')[1];
    let hrs = +timeNum[0].split(':')[0];
    if(timeNum[1] == 'PM'){
      if(hrs != 12)
        hrs = hrs + 12;
    }
    else if (hrs == 12){
      hrs = 0
    }
    return [hrs,mins]
  }

  onSubmit(formGroup: FormGroup) {
    //Creates new event/edits event based on field values

    let formControl = formGroup.getRawValue();

    /*Parse date (day and month)*/
    let month = String(formControl.dateControl.getMonth());
    month = String(Number(month) + 1);
    if(Number(month) < 10) {
      month = "0"+String(Number(month));
    }
    let day = String(formControl.dateControl.getDate());
    day = String(Number(day) + 1);
    if(Number(day) < 10) {
      day = "0"+String(Number(day));
    }
    let year = String(formControl.dateControl.getFullYear());
    /*End parse date*/

    /*Parse times (hrs and mins)*/
    let start = formControl.startTimeControl.replace(" ", "");
    let end = formControl.endTimeControl.replace(" ", "");
    console.log("Before parsing: " + start);
    //Parse start time
    let pm = start.toLowerCase().endsWith("pm"); //stores if start time was am or pm
    let am = start.toLowerCase().endsWith("am")
    start = start.toLowerCase().replace("am", ""); //removes am/pm suffixes
    start = start.toLowerCase().replace("pm", "");
    let minutes = start.slice(start.length - 3);
    start = start.slice(0, start.length - 3);
    if(pm) {
      if(start != "12") start = String(12 + Number(start));
    }
    if(am) {
      if(start == "12") start = (String(Number(start) - 12));
    }
    if(Number(start) < 10) start = "0"+start; //Needed before html time picker used
    start += minutes;

    //Now parse end time
    pm = end.toLowerCase().endsWith("pm"); //stores if start time was am or pm
    am = end.toLowerCase().endsWith("am");
    end = end.toLowerCase().replace("am", "");
    end = end.toLowerCase().replace("pm", "");
    minutes = end.slice(end.length - 3);
    end = end.slice(0, end.length - 3);
    if(pm) {
      if(end != "12") end = String(12 + Number(end));
    }
    if(am) {
      if(end == "12") end = (String(Number(end) - 12));
    }
    if(Number(end) < 10) end = "0"+end; //Needed before html time picker used
    end += minutes;
    /*End parse times*/

    //Format times for storing in JSON
    start = year + "-" + month + "-" + day + "T" + start + "+00:00";
    end = year + "-" + month + "-" + day + "T" + end + "+00:00";

    console.log("START: " + start);
    console.log("END: " + end);

    //Create new date objects using JSON format
    start = new Date(start);
    end = new Date(end);

    console.log("START: " + start);
    console.log("END: " + end);

    if(!this.eventLoaderService.loadEvent) {
      //Creates brand new event
      this.eventsRef.push({
        id : this.calendarService.nextID,
        eventName: formControl.nameControl,
        user: this.controller.user,
        sanctioned: false,
        startTime: start.toJSON(),
        endTime: end.toJSON(),
        description: formControl.descControl,
        location: formControl.locControl,
        organization: formControl.orgControl,
        meetsCriteria : true
      });
      let updates = {};
      updates['/nextID'] = this.calendarService.nextID + 1;
      this.dataBase.database.ref().update(updates); 
    } else {
      //Updates event if it is an edit
      //Create new event object
      let event = {
        id : this.eventLoaderService.curEvent.id,
        eventName: formControl.nameControl,
        user: this.eventLoaderService.curEvent.user,
        sanctioned: false,
        startTime: start.toJSON(),
        endTime: end.toJSON(),
        description: formControl.descControl,
        location: formControl.locControl,
        organization: formControl.orgControl,
        meetsCriteria : true
      }

      //Find event in database with ID of edited event
      let targetID = this.eventLoaderService.curEvent.id;
      let targetIndex = -1;
      let valSubscription = this.dataBase.list<any>('/events').valueChanges().subscribe((values) => {
        let i = 0;
        values.forEach((value) => { //Finds index of target event in database
          if(value.id == targetID) {
            targetIndex = i;

            //Use target index to update
            console.log(targetIndex);
            if(targetIndex == -1) return; //Unsuccessful edit
      
            let snapSubscription = this.dataBase.list<any>('/events').snapshotChanges().subscribe((values) => {
              let i = 0;
              values.forEach((value) => {
                if(i == targetIndex) { //Finds event at target index
                  let updates = {};
                  updates['/events/' + value.key] = event;
                  this.dataBase.database.ref().update(updates); //Pushes update to database
                  snapSubscription.unsubscribe(); //Unsubscribe to prevent further unintended changes
                }
                i++;
              });
            });
            valSubscription.unsubscribe();
          }
          i++;
        });
      });

    }
    this.router.navigateByUrl("/home"); //Go home when finished
    
  }

  
}

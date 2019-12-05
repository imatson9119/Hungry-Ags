import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CalendarService } from '../calendar.service';
import { ControllerService } from '../shared/controller.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Router } from '@angular/router';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],

})
export class NewEventComponent implements OnInit {
  public eventForm: FormGroup;
  public title : string = "";
  public location : string = "";
  public description : string = "";
  public date: Date;
  public start : string = "";
  public end : string = "";
  public organization : string = "";
  public user : string = "";
  public eventsRef : AngularFireList<any>;

  constructor(public router : Router, public fb: FormBuilder, public calendarService : CalendarService, public controller : ControllerService, public dataBase : AngularFireDatabase) {
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
    this.eventForm = this.fb.group({
      nameControl: ['', [Validators.required]],
      orgControl: ['', Validators.required],
      locControl: ['', Validators.required],
      dateControl: ['', [Validators.required]],
      startTimeControl: ['', [Validators.required]],
      endTimeControl: ['', [Validators.required]],
      descControl: ['', [Validators.required]],
    },{validator: this.checkTimes('startTimeControl', 'endTimeControl')});
  }

  checkTimes(start: string, end: string) {
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
    let formControl = formGroup.getRawValue();
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

    let start = formControl.startTimeControl.replace(" ", "");
    let end = formControl.endTimeControl.replace(" ", "");

    let pm = start.toLowerCase().endsWith("pm"); //stores if start time was am or pm
    let am = start.toLowerCase().endsWith("am")
    start = start.toLowerCase().replace("am", "");
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



    start = year + "-" + month + "-" + day + "T" + start + "+00:00";
    end = year + "-" + month + "-" + day + "T" + end + "+00:00";

    start = new Date(start);
    /*console.log(start.getTimezoneOffset());
    let hoursDiff = start.getHours() - start.getTimezoneOffset() / 60;
    let minutesDiff = (start.getMinutes() - start.getTimezoneOffset()) % 60;
    start.setHours(hoursDiff);
    start.setMinutes(minutesDiff);*/
    console.log("ADD START DATE");
    console.log(start);
    console.log(start.toJSON());
    console.log();

    end = new Date(end);
    /*console.log(end.getTimezoneOffset());
    hoursDiff = end.getHours() - end.getTimezoneOffset() / 60;
    minutesDiff = (end.getMinutes() - end.getTimezoneOffset()) % 60;
    end.setHours(hoursDiff);
    end.setMinutes(minutesDiff);*/
    console.log("ADD END DATE");
    console.log(end);
    console.log(end.toJSON());
    console.log();


    /*this.calendarService.foodEvents.push({
      eventName: formControl.nameControl,
      user: this.controller.getStorage(this.controller.AUTH_KEY),
      sanctioned: false,
      startTime: start,
      endTime: end,
      description: formControl.descControl,
      location: formControl.locControl,
      organization: formControl.orgControl,
      meetsCriteria : true
    });*/
    console.log("ID: " + this.calendarService.nextID);
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
    this.router.navigateByUrl("/home");
  }

  
}

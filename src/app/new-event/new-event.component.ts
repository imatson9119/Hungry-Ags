import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CalendarService } from '../calendar.service';
import { ControllerService } from '../shared/controller.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  constructor(public fb: FormBuilder, public calendarService : CalendarService, public controller : ControllerService) { }

  public registrationForm: FormGroup;
  public title : string = "";
  public location : string = "";
  public description : string = "";
  public date: Date;
  public start : string = "";
  public end : string = "";
  public organization : string = "";
  public user : string = "";

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  addEvent() {
    console.log("SERVED");
    console.log(this.title);
    
    let month = String(this.date.getMonth());
    if(Number(month) < 10) {
      month = "0"+String(Number(month) + 1);
    }
    let day = String(this.date.getDate());
    day = String(Number(day) + 1);
    if(Number(day) < 10) {
      day = "0"+String(Number(day));
    }
    let year = String(this.date.getFullYear());
    console.log(year,"-",month,"-",day);

    let start = this.start;
    let end = this.end;

    let pm = start.endsWith("pm"); //stores if start time was am or pm
    start = start.replace("am", "");
    start = start.replace("pm", "");
    let minutes = start.slice(start.length - 3);
    start = start.slice(0, start.length - 3);
    if(pm) {
      if(start != "12") start = String(12 + Number(start));
    }
    if(Number(start) < 10) start = "0"+start;
    start += minutes;

    pm = end.endsWith("pm"); //stores if start time was am or pm
    end = end.replace("am", "");
    end = end.replace("pm", "");
    minutes = end.slice(end.length - 3);
    end = end.slice(0, end.length - 3);
    if(pm) {
      if(end != "12") end = String(12 + Number(end));
    }
    if(Number(end) < 10) end = "0"+end;
    end += minutes;

    start = year + "-" + month + "-" + day + "T" + start + "+19:00";
    end = year + "-" + month + "-" + day + "T" + end + "+19:00";

    console.log("Time: ", start, "  ", end);

    this.calendarService.foodEvents.push({
      eventName: this.title,
      user: this.controller.getStorage(this.controller.USERNAME_KEY),
      sanctioned: false,
      startTime: start,
      endTime: end,
      description: this.description,
      location: this.location,
      organization: this.organization,
      meetsCriteria : true
    });
    console.log(this.calendarService.foodEvents[this.calendarService.foodEvents.length - 1].eventName);
  }

}

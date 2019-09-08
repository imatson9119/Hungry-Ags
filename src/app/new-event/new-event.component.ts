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
  public title : string;
  public location : string;
  public description : string;
  public date: string;
  public start : string;
  public end : string;
  public organization : string;
  public user : string;

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

    let dateParts = this.date.split("/");
    let start = this.start;
    let end = this.end;

    if(start.endsWith("am")) {
      start.replace("am", "");
    } else if (start.endsWith("pm")) {
      start.replace("pm", "");
      start.slice(0, start.length - 2);
    }


    this.calendarService.foodEvents.push({
      eventName: this.title,
      user: this.controller.getStorage(this.controller.USERNAME_KEY),
      sanctioned: false,
      startTime: "2019-09-08T17:00:00+00:00",
      endTime: "2019-09-08T18:00:00+00:00",
      description: this.description,
      location: this.location,
      organization: this.organization,
      meetsCriteria : true
    });
    console.log(this.calendarService.foodEvents[this.calendarService.foodEvents.length - 1].eventName);
  }

}

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
  registrationForm: FormGroup;
  title : string;
  location : string;
  description : string;
  start : string;
  end : string;
  organization : string;
  user : string;

  constructor(public fb: FormBuilder, public calendarService : CalendarService, public controller : ControllerService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.calendarService.foodEvents.push({
      eventName: "NEW",
      user: this.controller.getStorage(this.controller.USERNAME_KEY),
      sanctioned: false,
      startTime: "2019-09-08T17:00:00+00:00",
      endTime: "2019-09-08T18:00:00+00:00",
      description: "",
      location: "",
      organization: "",
      meetsCriteria : true
    });
    
    console.log(this.calendarService.foodEvents[this.calendarService.foodEvents.length - 1].eventName);
  }

  addEvent() {
    console.log("SERVED");
    this.calendarService.foodEvents.push({
      eventName: this.title,
      user: "placeholder@tamu.edu",
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

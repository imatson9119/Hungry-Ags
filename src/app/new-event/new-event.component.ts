import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CalendarService } from '../calendar.service';
import { ControllerService } from '../shared/controller.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],

})
export class NewEventComponent implements OnInit {
  constructor(public fb: FormBuilder, public calendarService : CalendarService, public controller : ControllerService) { }
  public eventForm: FormGroup;
  public title : string = "";
  public location : string = "";
  public description : string = "";
  public date: Date;
  public start : string = "";
  public end : string = "";
  public organization : string = "";
  public user : string = "";

  ngOnInit() {
    this.eventForm = this.fb.group({
      nameControl: ['', [Validators.required]],
      orgControl: ['', Validators.required],
      locControl: ['', Validators.required],
      dateControl: ['', [Validators.required]],
      startTimeControl: ['', [Validators.required]],
      endTimeControl: ['', [Validators.required]],
      descControl: ['', [Validators.required]],
    });
  }

  addEvent() {
    console.log("SERVED");
    console.log(this.title);
    
    let month = String(this.date.getMonth());
    month = String(Number(month) + 1);
    if(Number(month) < 10) {
      month = "0"+String(Number(month));
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
    //if(Number(start) < 10) start = "0"+start; //Needed before html time picker used
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
    //if(Number(end) < 10) end = "0"+end; //Needed before html time picker used
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

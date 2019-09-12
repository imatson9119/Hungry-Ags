import { AppComponent } from "../app.component";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CalendarService } from "../calendar.service";
import { ControllerService } from "../shared/controller.service";
import { AuthService } from 'angularx-social-login';

@Component({
  selector: "app-page-head",
  templateUrl: "./page-head.component.html",
  styleUrls: ["./page-head.component.scss"]
})
export class PageHeadComponent implements OnInit {
  constructor(
    public controllerService: ControllerService,
    public router: Router,
    public calendarService: CalendarService,
    private authService: AuthService
  ) {}
  public filter: string = "";
  public wasHome: boolean = false;

  ngOnInit() {
    this.controllerService.photo = this.controllerService.getStorage(this.controllerService.PHOTO_KEY);
    this.controllerService.user = this.controllerService.getStorage(this.controllerService.EMAIL_KEY);
    if(this.controllerService.user != null){
      this.controllerService.signedIn=true;
    }
  }

  checkIsHome() {
    if (!this.wasHome) {
      this.filter = "";
    }
    this.calendarService.calendarEvents = [];
    this.filter = this.filter.trim();
    if (this.filter.length > 0) {
      this.calendarService.calendarEvents = [];
      let events = this.calendarService.foodEvents;
      let filters = this.filter.split(" ");
      for (let i = 0; i < events.length; i++) {
        let event = [
          events[i].description,
          events[i].eventName,
          events[i].location,
          events[i].organization
        ];
        let numFound = 0;
        for (let j = 0; j < filters.length; j++) {
          for (let k = 0; k < event.length; k++) {
            //console.log(filters[j],"vs",event[k])
            if (
              event[k].toLowerCase().indexOf(filters[j].toLowerCase()) != -1
            ) {
              numFound++;
              //console.log("MATCH FOUND");
              break;
            }
          }
          //console.log("Num found:",numFound,"vs expected",1+j);
          if (numFound != 1 + j) break;
        }

        if (numFound == filters.length) {
          let color = "#6c1420";
          if (!events[i].sanctioned) color = "#00000000";
          this.calendarService.calendarEvents.push({
            title: events[i].location + " - " + events[i].eventName,
            start: events[i].startTime,
            end: events[i].endTime,
            color: color
          });
        }
      }
      //console.log("LENGTH:", this.calendarService.calendarEvents.length);
    } else {
      let events = this.calendarService.foodEvents;
      for (let i = 0; i < events.length; i++) {
        let color = "#6c1420";
        if (!events[i].sanctioned) color = "#00000000";
        this.calendarService.calendarEvents.push({
          title: events[i].location + " - " + events[i].eventName,
          start: events[i].startTime,
          end: events[i].endTime,
          color: color
        });
      }
      //console.log("LENGTH:", this.calendarService.calendarEvents.length);
    }

    this.wasHome = this.router.url === "/home";
    return this.wasHome;
  }
}

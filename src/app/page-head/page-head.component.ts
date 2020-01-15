import { AppComponent } from "../app.component";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CalendarService } from "../calendar/calendar.service";
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
  public verifiedOnly: boolean = false;

  ////////////////////////////////////////////////////////////////////////////////
  // This is where cached user info is retrieved and applied.
  ////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.controllerService.initUser();
    console.log("User:" + this.controllerService.user);
  }

  checkIsHome() {
    if (!this.wasHome) {
      this.filter = "";
      this.verifiedOnly = false;
    }

    this.calendarService.calendarEvents = [];
    this.filter = this.filter.trim();

    //Searches for words based on value of this.filter
    if (this.filter.length > 0) {
      this.calendarService.calendarEvents = [];
      let events = this.calendarService.foodEvents;
      let filters = this.filter.split(" "); //Splits to search on word by word basis
      for (let i = 0; i < events.length; i++) { //Iterates through events to find matches
        let event = [
          events[i].description,
          events[i].eventName,
          events[i].location,
          events[i].organization
        ];
        let numFound = 0;
        for (let j = 0; j < filters.length; j++) { //Iterates through each word in filter
          for (let k = 0; k < event.length; k++) { //Iterates through each data field in event
            if (
              event[k].toLowerCase().indexOf(filters[j].toLowerCase()) != -1
            ) {
              numFound++; //Match found
              break;
            }
          }
          if (numFound != 1 + j) break; //If a word was not found, not a match
        }

        if (numFound == filters.length) { //Makes sure every word in filter found as a match
          let color = "#6c1420"; //Verified by default
          if (!events[i].sanctioned) color = "#00000000"; //If not verified
          if(!this.verifiedOnly || events[i].sanctioned){
            this.calendarService.calendarEvents.push({ //Push event to display on calendar
              title: events[i].location + " - " + events[i].eventName,
              start: events[i].startTime,
              end: events[i].endTime,
              color: color
            });
          }
        }
      }
    } else { //If filter is empty, show all events
      let events = this.calendarService.foodEvents;
      for (let i = 0; i < events.length; i++) {
        let color = "#6c1420";
        if (!events[i].sanctioned) color = "#00000000";
        if(!this.verifiedOnly || events[i].sanctioned){
          this.calendarService.calendarEvents.push({ //Push event to display on calendar
            title: events[i].location + " - " + events[i].eventName,
            start: events[i].startTime,
            end: events[i].endTime,
            color: color
          });
        }
      }
    }

    this.wasHome = this.router.url === "/home";
    return this.wasHome;
  }

  ngOnDestroy(){
    var elem = document.getElementById("left")
    if(!elem.classList.contains("minimized"))
      elem.classList.remove("minimized");
  }
  getUser() : string{
    let user = this.controllerService.user;
    user = user.substring(0,user.indexOf('@'));
    if(user.length < 24){
      return user;
    }
    return user.substring(0,22) + "...";
  }

  toggleHamburger() {
    console.log("Toggled Hamburger");
    const hamburger = document.querySelectorAll(".hamburgerWrapper");
    const line1 = document.querySelectorAll(".line1");
    const line2 = document.querySelectorAll(".line2");
    const line3 = document.querySelectorAll(".line3");

    hamburger.forEach((item) => {
      item.classList.toggle("hamburgerActive");
    });

    
    line1.forEach((item) => {
      item.classList.toggle("hamburgerActive");
    });

    
    line2.forEach((item) => {
      item.classList.toggle("hamburgerActive");
    });

    
    line3.forEach((item) => {
      item.classList.toggle("hamburgerActive");
    });


  }
}

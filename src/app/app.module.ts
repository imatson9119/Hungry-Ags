import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageHeadComponent } from "./page-head/page-head.component";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    AboutComponent,
    PageHeadComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FullCalendarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

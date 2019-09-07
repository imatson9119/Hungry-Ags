import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageHeadComponent } from "./page-head/page-head.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    AboutComponent,
    PageHeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

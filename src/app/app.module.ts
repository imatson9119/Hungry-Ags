import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
=======
import { PageHeadComponent } from './page-head/page-head.component';
>>>>>>> 1bbdec7547e9d379ed6a922dde3dcda5406fd0d7

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    CalendarComponent,
    LoginComponent,
    AboutComponent
=======
    PageHeadComponent
>>>>>>> 1bbdec7547e9d379ed6a922dde3dcda5406fd0d7
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

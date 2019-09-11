import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalendarComponent, EventDialog } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageHeadComponent } from "./page-head/page-head.component";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import {
  RegisterComponent,
  ConfirmEmailDialog
} from "./register/register.component";
import { FooterComponent } from "./footer/footer.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NewEventComponent } from './new-event/new-event.component';
import { RegisterOrgComponent, RegistrationDialog } from './register-org/register-org.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { provideRoutes } from '@angular/router';
import { DevComponent } from './dev/dev.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AboutUsComponent } from './about-us/about-us.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("416041496495-sbu52cqu7jc6ft1oh5u2rcqt5m5ggg3i.apps.googleusercontent.com"),
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    AboutComponent,
    PageHeadComponent,
    RegisterComponent,
    FooterComponent,
    ConfirmEmailDialog,
    NewEventComponent,
    RegisterOrgComponent,
    EventDialog,
    RegistrationDialog,
    DevComponent,
    NotAuthorizedComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule,
    SocialLoginModule
  ],
  providers: [HttpClientModule, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, AuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmEmailDialog, EventDialog, RegistrationDialog]
})
export class AppModule { }

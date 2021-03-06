import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalendarComponent, EventDialog } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";
import { PageHeadComponent } from "./page-head/page-head.component";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
import { FooterComponent } from "./footer/footer.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NewEventComponent } from './new-event/new-event.component';
import { RegisterOrgComponent, RegistrationDialog, SampleDialog } from './register-org/register-org.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { provideRoutes } from '@angular/router';
import { DevComponent } from './dev/dev.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireFunctions, AngularFireFunctionsModule } from '@angular/fire/functions';
import { NotFoundComponent } from './not-found/not-found.component';
import { HelpComponent } from './help/help.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardAdminService } from './shared/auth-guard-admin.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("416041496495-sbu52cqu7jc6ft1oh5u2rcqt5m5ggg3i.apps.googleusercontent.com"),
  }
]);

export function provideConfig() {
  return config;
}

if (!environment.firebase) {
  if (!environment.firebase.apiKey) {
    window.alert("configErrMsg");
  } else if (environment.firebase.storageBucket === '') {
    window.alert("bucketErrMsg");
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    PageHeadComponent,
    FooterComponent,
    NewEventComponent,
    RegisterOrgComponent,
    EventDialog,
    RegistrationDialog,
    SampleDialog,
    DevComponent,
    NotAuthorizedComponent,
    AboutUsComponent,
    NotFoundComponent,
    HelpComponent,
    AdminDashboardComponent,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  providers: [HttpClientModule, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, AuthGuardService, AuthService, AuthGuardAdminService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EventDialog, RegistrationDialog,SampleDialog]
})
export class AppModule { }

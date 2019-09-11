import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";

import { AboutComponent } from "./about/about.component";
import { RegisterComponent } from "./register/register.component";
import { NewEventComponent } from './new-event/new-event.component';
import { RegisterOrgComponent } from './register-org/register-org.component';
import { DevComponent } from './dev/dev.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: CalendarComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "register", component: RegisterComponent},
  { path: "new-event", component: NewEventComponent},
  { path: "register-org", component: RegisterOrgComponent},
  { path: "dev", component: DevComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

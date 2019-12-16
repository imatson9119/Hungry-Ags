import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";

import { AboutComponent } from "./about/about.component";
import { RegisterComponent } from "./register/register.component";
import { NewEventComponent } from './new-event/new-event.component';
import { RegisterOrgComponent } from './register-org/register-org.component';
import { DevComponent } from './dev/dev.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HelpComponent } from './help/help.component';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: CalendarComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutUsComponent },
  { path: "register", component: RegisterComponent},
  { path: "new-event", component: NewEventComponent, canActivate: [AuthGuardService]},
  { path: "register-org", component: RegisterOrgComponent, canActivate: [AuthGuardService]},
  { path: "help", component: HelpComponent },
  { path: "dev", component: DevComponent},
  { path: "not-authorized", component: NotAuthorizedComponent},
  { path: "admin-dashboard", component : AdminDashboardComponent},
  { path: "404", component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

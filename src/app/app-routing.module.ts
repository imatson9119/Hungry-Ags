import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";

import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: CalendarComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

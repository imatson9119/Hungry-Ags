import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import list from '@fullcalendar/list'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title="Hungry Ags!";
  calendarPlugins = [dayGridPlugin, list]; // important!
  constructor(public router: Router){

  }
}

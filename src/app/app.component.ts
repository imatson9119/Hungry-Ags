import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import list from '@fullcalendar/list'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title="Hungry Ags!";
  calendarPlugins = [dayGridPlugin, list]; // important!

}
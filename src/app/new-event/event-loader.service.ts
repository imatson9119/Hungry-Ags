import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventLoaderService {
  loadEvent: boolean;
  curEvent: any;

  constructor() { 
    this.loadEvent = false;
    this.curEvent = {
      name: "Test Name",
      organization: "Org",
      location: "MSC",
      date: "12/5/2019",
      start: "8:00 AM",
      end: "1:00 PM",
      description: "Hello, here's a nice description of my event."
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-page-head',
  templateUrl: './page-head.component.html',
  styleUrls: ['./page-head.component.scss']
})
export class PageHeadComponent implements OnInit {
  filter = "";

  constructor() { }

  ngOnInit() {
    console.log(this.filter);
  }



}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  @Input()
  relative: boolean;

  constructor() {}

  ngOnInit() { console.log(this.relative); }

  getPosition() {
    if (this.relative) {
      return "relative";
    } else {
      return "absolute";
    }
  }
}

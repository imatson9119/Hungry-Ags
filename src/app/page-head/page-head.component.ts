import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-head",
  templateUrl: "./page-head.component.html",
  styleUrls: ["./page-head.component.scss"]
})
export class PageHeadComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}

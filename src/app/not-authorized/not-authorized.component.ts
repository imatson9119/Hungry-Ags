import { Component, OnInit } from '@angular/core';
import { SEOService } from '../shared/seo.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {

  constructor(public seoService: SEOService) { }

  ngOnInit() {
    this.seoService.updateTitle("Hungry Ags");
    this.seoService.updateDescription("Sorry, but you are not authorized to access this page. Please try logging in!");
  }

}

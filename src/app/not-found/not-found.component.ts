import { Component, OnInit } from '@angular/core';
import { SEOService } from '../shared/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public seoService: SEOService) { }

  ngOnInit() {
    this.seoService.updateTitle("Hungry Ags");
    this.seoService.updateDescription("Sorry, but the page you're looking for doesn't seem to exist anymore.")
  }

}

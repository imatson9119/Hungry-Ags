import { Component, OnInit } from '@angular/core';
import { SEOService } from '../shared/seo.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(public seoService: SEOService) { }

  ngOnInit() {
    this.seoService.updateTitle("About Hungry Ags");
    this.seoService.updateDescription("At Hungry Ags, we've mined the depths of the world of free food to present the best of the best as the freebies are announced. Check back often (this list is updated regularly) to know exactly when you can expect to fill up for free on-campus. Part of an organization looking for members? Post your event here today and start recruiting prospective members.")
  }
  scroll(id: string){
    document.getElementById(id).scrollIntoView();
  }

}

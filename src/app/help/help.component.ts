import { Component, OnInit } from '@angular/core';
import { SEOService } from '../shared/seo.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(public seoService: SEOService) { }

  ngOnInit() {
    this.seoService.updateTitle("Hungry Ags - Help")
    this.seoService.updateDescription("Come here to get help on how to effectively use Hungry Ags, whether you're looking for free food or trying to promote your own events.")
  }
  scroll(id: string){
    document.getElementById(id).scrollIntoView();
  }
}

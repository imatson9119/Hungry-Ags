import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../shared/controller.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  constructor(public controllerService: ControllerService) { }

  ngOnInit() {
  }
  login(){
    this.controllerService.signedIn = true;
    this.controllerService.user = 'hungryagsofficial@gmail.com';
    this.controllerService.orgName = 'Your Organization'
    this.controllerService.admin = true;
  }
}

import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ControllerService } from '../shared/controller.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public controllerService: ControllerService) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit(form: FormGroup){
    this.controllerService.signedIn = true;
    console.log("submitted");
  }
}

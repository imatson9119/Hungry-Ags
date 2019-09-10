import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ControllerService } from '../shared/controller.service';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
 

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public controllerService: ControllerService,private authService: AuthService) {}
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
  onLogin(){
    this.controllerService.signedIn = true; 
    this.controllerService.setStorage(this.controllerService.SIGNED_IN_KEY,"true"); 
    this.controllerService.setStorage(this.controllerService.USERNAME_KEY, this.loginForm.value.email);
  }  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }

}

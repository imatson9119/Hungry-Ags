import { Injectable, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class ControllerService implements OnInit {
  SIGNED_IN_KEY = 'signedIn';
  USERNAME_KEY = 'user';
  signedIn: boolean;
  user: any;

  constructor(private authService: AuthService) {

   }

   ngOnInit(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signedIn = (user != null);
    });
  }

   setStorage(key: string, value: any){
     window.localStorage.setItem(key, value)
   }
   getStorage(key: string){
     return window.localStorage.getItem(key);
   }
   ngOnDestroy(){
     this.setStorage(this.SIGNED_IN_KEY,this.signedIn.toString())
   }
   signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }

}

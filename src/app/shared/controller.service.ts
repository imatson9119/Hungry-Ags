import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class ControllerService implements OnInit, OnDestroy {
  AUTH_KEY = 'signedIn';
  signedIn: boolean;
  user: any;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signedIn = (user != null);
    });
  }
  setStorage(key: string, value: any) {
    window.localStorage.setItem(key, value)
  }
  getStorage(key: string) {
    return window.localStorage.getItem(key);
  }
  ngOnDestroy() {
    this.setStorage(this.AUTH_KEY, this.authService.authState)
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData.email;
      this.signedIn = true;
      
    });
  }
  signOut(): void {
    this.authService.signOut();
    this.signedIn = false;
  }

}

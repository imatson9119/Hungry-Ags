import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ControllerService implements OnInit, OnDestroy {
  AUTH_KEY = 'signedIn';
  PHOTO_KEY = 'photo';
  EMAIL_KEY = 'email'
  signedIn: boolean;
  user: any;
  photo: string;
  admin: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
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
  clearStorage(){
    window.localStorage.removeItem(this.EMAIL_KEY)
    window.localStorage.removeItem(this.PHOTO_KEY)
  }
  ngOnDestroy() {
    this.setStorage(this.AUTH_KEY, this.authService.authState)
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData.email;
      this.photo = userData.photoUrl;
      this.signedIn = true;
      this.setStorage(this.EMAIL_KEY,this.user);
      this.setStorage(this.PHOTO_KEY,this.photo);
      if(this.user = "hungryagsofficial@gmail.com"){
        this.admin = true;
      }
    });
  }
  signOut(): void {
    this.authService.signOut();
    this.signedIn = false;
    this.clearStorage();
    let snackBarRef = this.snackBar.open('Successfully logged out.', 'Ok',{
      duration: 3000
    });
  }

}

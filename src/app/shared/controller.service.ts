import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/database';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ControllerService implements OnInit, OnDestroy {
  AUTH_KEY = 'signedIn';
  PHOTO_KEY = 'photo';
  EMAIL_KEY = 'email'
  ORGNAME_KEY = 'orgName'
  signedIn: boolean;
  user: any;
  photo: string;
  orgName: string = "";
  admin: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private database : AngularFireDatabase) {
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
    window.localStorage.removeItem(this.ORGNAME_KEY)
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
      if(this.user == "hungryagsofficial@gmail.com"){
        this.admin = true;
      }
      let subscription = this.database.list<any>("/orgs").valueChanges().subscribe((values) => {
        values.forEach(value => {
          if(value.user == this.user) {
            this.orgName = value.orgName;
            this.setStorage(this.ORGNAME_KEY,this.orgName);
            subscription.unsubscribe();
          }
        });
        subscription.unsubscribe();
      });
    });
  }
  signOut(): void {
    this.authService.signOut();
    this.signedIn = false;
    this.admin = false;
    this.orgName = "";
    this.clearStorage();
    let snackBarRef = this.snackBar.open('Successfully logged out.', 'Ok',{
      duration: 3000
    });
  }
  initUser(){
    this.photo = this.getStorage(this.PHOTO_KEY); 
    this.user = this.getStorage(this.EMAIL_KEY);
    this.orgName = this.getStorage(this.ORGNAME_KEY);
    if(this.user != null){
      this.signedIn=true;
      if(this.user == "hungryagsofficial@gmail.com"){
        this.admin = true;
      }
    }
  }
}

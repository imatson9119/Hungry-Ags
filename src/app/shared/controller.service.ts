import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  SIGNED_IN_KEY = 'signedIn';
  USERNAME_KEY = 'user';
  signedIn: boolean;
  constructor() {
    if(this.getStorage(this.SIGNED_IN_KEY) != null){
      this.signedIn = this.getStorage(this.SIGNED_IN_KEY) === 'true';
    }
    console.log(this.signedIn);
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

}

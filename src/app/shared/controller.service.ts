import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  signedIn: boolean
  constructor() {
    this.signedIn=false;
   }
}

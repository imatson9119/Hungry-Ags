import { Component, OnInit ,Inject} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ControllerService } from '../shared/controller.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

export interface DialogData {
  orgName: string;
  username: string;
}

@Component({
  selector: 'app-register-org',
  templateUrl: './register-org.component.html',
  styleUrls: ['./register-org.component.scss']
})
export class RegisterOrgComponent implements OnInit {
  registrationForm: FormGroup;
  displayPassError : boolean = false;
  constructor(public fb: FormBuilder, public dialog: MatDialog, public controllerService: ControllerService) { }
  orgName: string;
  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
    });
    
  }
  scroll(id: string){
    document.getElementById(id).scrollIntoView();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialog, {
      width: '350px',
      data: {orgName: this.orgName, username: this.controllerService.user}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  onSubmit(registrationForm){
    this.orgName = this.registrationForm.value.name;
    this.openDialog();

  }
  openSampleDialog(): void {
    const dialogRef = this.dialog.open(SampleDialog, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'confirm-registration.html',
  styleUrls: ["./confirm-registration.scss"]
})
export class RegistrationDialog {

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public http : HttpClient) {}

  onConfirmClick() : void {
    console.log("Registration confirmed");
    let emailContent = this.data.orgName + ' requests to be registered under the following account: ' + this.data.username;
    let url = 'https://us-central1-hungry-ags.cloudfunctions.net/sendMail?dest=support@hungryags.com&subject=ORGANIZATION REGISTRATION REQUEST: ' + this.data.orgName + '&content=' + emailContent;
    // Prepare the header 
    let headers: HttpHeaders = new HttpHeaders();
    //headers.set('parameter-name' , 'parameter-value');

    // Send request with parameters            
    let test = this.http.get(url, {responseType: 'text'}).subscribe(res => {});   
    console.log("SENT");
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "eventDialog.html",
  styleUrls: ["eventDialog.scss"]
})
export class SampleDialog {
  constructor(
    public dialogRef: MatDialogRef<SampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
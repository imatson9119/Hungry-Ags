import { Component, OnInit ,Inject} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-register-org',
  templateUrl: './register-org.component.html',
  styleUrls: ['./register-org.component.scss']
})
export class RegisterOrgComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(public fb: FormBuilder, public dialog: MatDialog) { }

  username: string;
  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
    });
    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialog, {
      width: '350px',
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onSubmit(){
    this.username = this.registrationForm.value.name;
    this.openDialog();

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
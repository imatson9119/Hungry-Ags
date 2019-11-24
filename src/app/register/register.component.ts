import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { RegisterService } from "./register.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  animal: string;
  name: string;
  registrationForm: FormGroup;
  displayPassError: boolean;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public registerService: RegisterService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmEmailDialog, {
      width: "250px",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl("/home");
      this.animal = result;
    });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  onSubmit(form: FormGroup){
  }
}

@Component({
  selector: "confirm-email",
  templateUrl: "confirm-email.html",
  styleUrls: ["./confirm-email.scss"]
})
export class ConfirmEmailDialog {
  constructor(
    public registerService: RegisterService,
    public dialogRef: MatDialogRef<ConfirmEmailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

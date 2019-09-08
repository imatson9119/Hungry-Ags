import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { RegisterService } from "./register.service";
import { Router } from "@angular/router";
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

  constructor(
    public router: Router,
    public registerService: RegisterService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {}
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

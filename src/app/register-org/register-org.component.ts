import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-org',
  templateUrl: './register-org.component.html',
  styleUrls: ['./register-org.component.scss']
})
export class RegisterOrgComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(public fb: FormBuilder) { }
  
  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

}

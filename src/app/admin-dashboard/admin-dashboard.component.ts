import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public orgsRef : AngularFireList<any>;
  public orgs = []

  constructor(public database : AngularFireDatabase) { }

  ngOnInit() {
    //Subscribe to and populate orgs
    let orgSubscription = this.database.list<any>('/orgs').valueChanges().subscribe((values) => {
      this.orgs = []
      values.forEach(value => {
        let org = {name : value.orgName, user : value.user, approved : Boolean(value.approved), requestDate : value.requestDate}
        this.orgs.push(org);
      });
    });
  }

  onChange(orgName, user, checked) {
    console.log(orgName);
    console.log(user);
    console.log(checked);
  }

  delete(orgName, user) {

  }
}

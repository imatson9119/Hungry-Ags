import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public orgsRef : AngularFireList<any>;
  public orgs = [];

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

  onChange(org, orgName, user) {
    org = {orgName : orgName, user : user, approved : String(org.approved), requestDate : org.requestDate};
    console.log(org.approved);

    let valSubscription = this.database.list<any>('/orgs').valueChanges().subscribe((values) => {
      let i = 0;
      values.forEach(value => {
        if (value.orgName == orgName && value.user == user) {
          let targetIndex = i;
          let idSubscribtion = this.database.list<any>('/orgs').snapshotChanges().subscribe((vals) => {
            let j = 0;
            vals.forEach(val => {
              if(j == targetIndex) {
                //Update target
                let updates = {};
                updates['/orgs/' + val.key] = org;
                this.database.database.ref().update(updates); //Pushes update to database
                console.log("UPDATED");
                idSubscribtion.unsubscribe(); //Unsubscribe to prevent further unintended changes
              }
              j++;
            });
            idSubscribtion.unsubscribe();
          });
          valSubscription.unsubscribe();
        }
        i++;
      });
      valSubscription.unsubscribe();
    });
  }

  delete(orgName, user) {

  }
}

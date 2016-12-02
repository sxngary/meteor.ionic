import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
import {showAlert} from "../shared/show-alert";
import template from './details.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class PatientDetailsComponent extends MeteorComponent implements OnInit {
  patient:any[];
  //user: Meteor.User;
  
  constructor(
    //private route: ActivatedRoute, 
    //private ngZone: NgZone
  ) {
      super();
  }

    ngOnInit() {
       //console.log(Meteor.user(),'sssss',this.user,Meteor.userId());
       //----------------patient profile data------------------//
        this.call("userProfile", Meteor.userId(), (err, res)=> {
            if (err) {
                showAlert("Error while fetching patient data.", "danger");
                return;
            }else{
                this.patient = res;    
            }
            
        });
        
    }

}
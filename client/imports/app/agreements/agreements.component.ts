import { Component, OnInit, NgZone } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent} from 'angular2-meteor';
import { showAlert} from "../shared/show-alert";
//import { Observable } from "rxjs/Observable";
//import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from 'rxjs/Subscription';

//import { Agreements, PatientAgreements } from "../../../../both/collections/agreements.collection";
//import { Patients } from "../../../../both/collections/csvs.collection";

import template from './agreements.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class AgreementsComponent extends MeteorComponent implements OnInit {
  patient:any[];
  //user: Meteor.User;
  //patientId: String;
  //patientResult : Observable<any[]>;
  //patientAgree : Observable<any[]>;
  agreementData: any[];
  //patientAgreementSub: Subscription;
  //agreementSub: Subscription;
  //patientSub: Subscription;
  
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
        
        /*this.patientSub =  MeteorObservable.subscribe('patientResults', Meteor.userId()).subscribe(() => {
            
            var patientResult = Patients.find({userId:Meteor.userId()}).zone();
            //console.log(patientResult.source.fetch(),'this.patientData');
            
            var patientData = patientResult.source.fetch();
            this.patientId = patientData[0]._id;
            
            //console.log(this.patientId,'this.patientId');
            
            this.patientAgreementSub =  MeteorObservable.subscribe('patientAgreements',this.patientId).subscribe(() => {
                this.patientAgree = PatientAgreements.find({patientId:this.patientId}).zone();
                console.log(this.patientAgree.source.fetch(),'sdd');
                var patientAgreementData = this.patientAgree.source.fetch();
                //console.log(patientAgreementData[0].agreement._id,'sdsdsd');
                
                this.agreementSub =  MeteorObservable.subscribe('agreementResults',patientAgreementData[0].agreement._id).subscribe(() => {
                    this.agreementData = Agreements.find({_id:patientAgreementData[0].agreement._id}).zone();
                    //console.log(this.agreementData.source.fetch(),'agree data');
                });
                
            });
        });*/
    }

}
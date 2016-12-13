import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent} from 'angular2-meteor';
import { showAlert} from "../shared/show-alert";
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, Subject} from "rxjs";
import { ChangeDetectorRef } from "@angular/core"
import { ProviderService } from "../../services/provider.service";

import template from './view-agreement.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class ViewAgreementComponent extends MeteorComponent implements OnInit {
    agreementData: any[];
    agreementId: String;
    paramsSub: Subscription;
    
    constructor(
      private navCtrl: NavController, 
      private navParams: NavParams,
      private providerService: ProviderService,
      private cd: ChangeDetectorRef
    ) 
    {
        super();
    }

    ngOnInit() {
        //----------------patient agreements data------------------//
        this.agreementId = this.navParams.get("agreementId");
        
        this.call("viewAgreements", this.agreementId, (err, res)=> {
            if (err) {
                showAlert("Error while fetching patient data.", "danger");
                return;
            }else{
                this.agreementData = res;    
            }                
        });
    }

    parseUserData(string) {
        let user = Meteor.user();
        let provider = this.providerService.getData();
        //console.log('provider:', provider);
        user.profile.fullName = user.profile.firstName + " " + user.profile.lastName;

        string = string.replace(new RegExp("{{patientName}}", 'g'), user.profile.fullName);
        if (typeof provider !== "undefined") {
            string = string.replace(new RegExp("{{providerName}}", 'g'), provider.profile.fullName);
            this.cd.detach();
        }

        return string;
    }

}
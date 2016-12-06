import { Component, OnInit, NgZone } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent} from 'angular2-meteor';
import { showAlert} from "../shared/show-alert";
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, Subject} from "rxjs";

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
      private route: ActivatedRoute, 
      //private ngZone: NgZone
    ) {
        super();
    }

    ngOnInit() {
        //----------------patient agreements data------------------//
        this.paramsSub = this.route.params
            .map(params => params['agreementId'])
            .subscribe(agreementId => {
            this.agreementId = agreementId;
            this.call("viewAgreements", this.agreementId, (err, res)=> {
                if (err) {
                    showAlert("Error while fetching patient data.", "danger");
                    return;
                }else{
                    this.agreementData = res;    
                }                
            });
        });
    }

}
import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { showAlert } from "../shared/show-alert";
import { Subscription } from 'rxjs/Subscription';
import { ViewAgreementComponent } from "./view-agreement.component";

import template from './agreements.component.html';

@Component({
    selector: '',
    template
})
@InjectUser('user')
export class AgreementsComponent extends MeteorComponent implements OnInit {
    patient: any[];
    agreementData: any[];

    constructor(private navCtrl: NavController, private navParams: NavParams) {
        super();
    }

    ngOnInit() {
        //----------------patient agreements list------------------//
        this.call("assignAgreements", Meteor.userId(), (err, res) => {
            if (err) {
                showAlert("Error while fetching patient data.", "danger");
                return;
            } else {
                this.agreementData = res;
            }

        });
    }

    viewDetails(id) {
        this.navCtrl.push(ViewAgreementComponent, {
            agreementId: id,
        });
    }

}
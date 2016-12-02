import {Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import {MeteorComponent} from 'angular2-meteor';
import {Observable, Subscription, Subject} from "rxjs";
import { Meteor } from 'meteor/meteor';
import { showAlert } from "../shared/show-alert";

import template from './signup.component.html';

@Component({
  selector: 'signup',
  template
})
export class SignupComponent extends MeteorComponent implements OnInit {
  signupForm: FormGroup;
  error: string;
  code: string;
  paramsSub: Subscription;
  //patientObj:any[];
  //patientCode: String;

  constructor(
              private router: Router,
              private route:ActivatedRoute,
              private zone: NgZone,
              private formBuilder: FormBuilder
        ){
            super();
        }

  ngOnInit() {
    
    this.paramsSub = this.route.params
        .map(params => params['code'])
        .subscribe(code => {
            this.code = code;
            this.call("patientsAccessCode", code, (err, patient) => {
                if (err) {                    
                    showAlert("Error while fetching patient record.", "danger");
                    return;
                }
                //console.log(patient);                
                this.zone.run(() => {
                    if (patient) {
                        this.signupForm = this.formBuilder.group({
                            firstName: [patient.firstName, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]{2,30}")]) ],
                            lastName: [patient.lastName, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]{2,30}")]) ],
                            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                            email: [patient.email, Validators.required],
                            accessCode: [patient.accessCode, Validators.compose([Validators.minLength(6), Validators.required])],
                        });
                    }
                });
            });
        });
        
        this.signupForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)]) ],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            accessCode:['', Validators.required],
        });

    this.error = '';
  }

  //-----------patient signup-------------//
  signup() {
    if (this.signupForm.valid) {
        var patientCode = this.signupForm.value.accessCode;
        var patientObj = {
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
            type: "patient",
            profile: {
                firstName: this.signupForm.value.firstName,
                lastName: this.signupForm.value.lastName
            }
        }
        
        this.call("insertPatient", patientObj, patientCode, (err, patient) => {
            if (err) {
                showAlert(err.reason, "danger");
                return;
            }
            if (patient) {
                Meteor.loginWithPassword(this.signupForm.value.email, this.signupForm.value.password, (err) => {
                    if (err) {
                        this.zone.run(() => {
                          this.error = err;
                        });
                    } else {
                        this.router.navigate(['/dashboard']);
                    }
                });
            }
        });
        
        /*
        Accounts.createUser({
          email: this.signupForm.value.email,
            password: this.signupForm.value.password,
            type: "patient",
            profile: {
                firstName: this.signupForm.value.firstName,
                lastName: this.signupForm.value.lastName
            }
        }, (err) => {
            if (err) {
                this.zone.run(() => {
                  this.error = err;
                });
            } else {
                this.router.navigate(['/dashboard']);
            }
        });*/
    }
  }
}
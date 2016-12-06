import {Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import template from './login.component.web.html';

@Component({
  selector: 'login',
  template
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: string;
  
    constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}
  
    ngOnInit() {
        var emailRegex = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})";
        this.loginForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
          password: ['', Validators.required]
        });
        this.error = '';
    }

    login() {
        if (this.loginForm.valid) {
            
            Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
                if (err) {
                    this.zone.run(() => {
                      this.error = err;
                    });
                } else {
                    this.router.navigate(['/dashboard']);
                }
            });
        }
    }
}
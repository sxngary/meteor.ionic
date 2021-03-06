import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import template from './app.component.web.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

declare var jQuery:any;

@Component({
    selector: 'app',
    template
})
@InjectUser('user')
export class AppComponent implements OnInit, AfterViewInit {
    constructor(private router: Router) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        jQuery(function($){
            $(".button-collapse").sideNav();
            $('select').material_select();
        })
    }
}

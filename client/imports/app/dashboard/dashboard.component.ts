import { Component, OnInit } from "@angular/core";
import { Meteor } from "meteor/meteor";

import { ProviderService } from "../../services/provider.service";

import template from "./dashboard.html";

@Component({
    selector: "dashboard",
    template
})

export class DashboardComponent implements OnInit {
    constructor(private providerService: ProviderService) {
        $('.collapsible').collapsible();
    }

    ngOnInit() {
        if (Meteor.userId()) {
            this.providerService.fetchData();
        }
    }
}
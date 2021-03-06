import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';
//import { routes as patientRoutes } from "./patient/routes";

import { SignupComponent } from "./auth/singup.component";
import { RecoverComponent } from "./auth/recover.component";
import { LoginComponent } from "./auth/login.component.web";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LandingComponent } from "./layout/landing.component";
import { PatientDetailsComponent } from "./patient/details.component";
import { AgreementsComponent } from "./agreements/agreements.component";
import { ViewAgreementComponent } from "./agreements/view-agreement.component";

let mainRoutes = [
    { path: '', component: LandingComponent/*, canActivate: ['canActivateForLogoff']*/ },
    { path: 'dashboard', component: DashboardComponent, canActivate: ['canActivateForLoggedIn'] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signup/:code', component: SignupComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'profile', component: PatientDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
    { path: 'agreements', component: AgreementsComponent, canActivate: ['canActivateForLoggedIn'] },
    { path: 'agreements/:agreementId', component: ViewAgreementComponent, canActivate: ['canActivateForLoggedIn'] },
];

export const routes: Route[] = [
    ...mainRoutes,
    //...patientRoutes
];

export const ROUTES_PROVIDERS = [
    {
        provide: 'canActivateForLoggedIn',
        useValue: () => !! Meteor.userId()
    },
    {
        provide: 'canActivateForLogoff',
        useValue: () => ! Meteor.userId()
    },
];
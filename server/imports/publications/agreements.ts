import { Meteor } from 'meteor/meteor';
import { Agreements, PatientAgreements } from "../../../both/collections/agreements.collection";
import { Patients } from "../../../both/collections/csvs.collection";

//Meteor.publish('patientAgreements', function(patientId: string) {
//    //console.log('sdsdsd',patientId);
//    return PatientAgreements.find({patientId:patientId});
//});
//
//Meteor.publish('patientResults', function(userId: string) {
//    var patientResult = Patients.find({userId:userId});
//    if (patientResult) {
//        return  patientResult;
//    }
//});
//
//Meteor.publish('agreementResults', function(agreementId: string) {
//    var agreementResult = Agreements.find({_id:agreementId});
//    if (agreementResult) {
//        return  agreementResult;
//    }
//});
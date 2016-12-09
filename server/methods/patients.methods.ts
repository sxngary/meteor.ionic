import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {Patients} from "../../both/collections/csvs.collection";
//import {Patient} from "../../both/models/csv.model";
//import {check} from "meteor/check";
//import {Email} from "meteor/email";
//import {isValidEmail, isValidName, isValidPhone} from "../../both/validators";

Meteor.methods({
    
    //----------------check valid patients------------//
    "patientsAccessCode": (accessCode: String) => {
        //console.log(accessCode,'patientId');
        if (accessCode != undefined) {
            var patientData = Patients.collection.findOne({accessCode: accessCode});
            if (patientData) {
                return patientData;
            }else{
                throw new Meteor.Error(403, "Access code not matched.");
            }
        }else{
            return;
        }
    },
    
    //-------create patients----------//
    "insertPatient": (patientObj, patientCode) => {
        if (patientCode) {
            var patientData = Patients.collection.findOne({accessCode:patientCode, userId: {$exists: false}, "status.isDeleted":false });
            if (patientData) {
                patientObj['profile']["dob"] = patientData.dob;
                patientObj['profile']["gender"] = patientData.gender;
                patientObj['profile']["ssn"] = patientData.ssn;
                patientObj['profile']["phoneNum"] = patientData.phoneNum;
                patientObj['profile']["address"] = patientData.address;
                patientObj['profile']["city"] = patientData.city;
                patientObj['profile']["state"] = patientData.state;
                patientObj['profile']["zip"] = patientData.zip;
                patientObj['profile']["company"] = patientData.company;
                patientObj['profile']["insurer"] = patientData.insurer;
                patientObj['profile']["guarantor"] = patientData.guarantor;
                patientObj['providerId'] = patientData.providerId;
                patientObj['patientId'] = patientData._id;
                var userId = Accounts.createUser(patientObj);
                if (userId) {
                    let getCode = Patients.update({_id:patientData._id},{$set:{userId:userId}});
                    if (getCode) {
                        return userId;
                    }else{
                        throw new Meteor.Error(403, "Invalid user passed to patient.");
                    }
                }
            }else{
                throw new Meteor.Error(403, "Invalid access code.");
            }
        }else{
            throw new Meteor.Error(403, "Access code not matched.");
        }
    },

    //-------find provider data for logged-in user-----//
    "fetchProvider": () => {
        let user = Meteor.user();

        if (typeof user.providerId == "undefined") {
            return;
        }

        let provider = Meteor.users.findOne({_id: user.providerId}, {
            "fields": {"profile": 1}
        });
        return provider;
    }

});
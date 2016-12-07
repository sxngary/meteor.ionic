import { Meteor} from "meteor/meteor";

import { Agreements, PatientAgreements} from "../../both/collections/agreements.collection";
import { Patients } from "../../both/collections/csvs.collection";

Meteor.methods({
    
    "assignAgreements": (userId) => {
       
        var agreementIds = [];
        var patientId = Patients.findOne({userId:userId});
       
        var patientAgreements = PatientAgreements.find({patientId:patientId._id}).fetch();
       
        for (var i=0; i<patientAgreements.length; i++) {
            agreementIds.push(patientAgreements[i]['agreement']['_id'])
        }
       
        var agreements = Agreements.find({_id:{ "$in": agreementIds }, status:true,isDeleted:0}).fetch();
       
        if (agreements) {
            return agreements;
        }else{
            return [];    
        }
        
    },
    
    "viewAgreements": (agreementId): any => {
        //console.log(agreementId,'agreementId');
        var agreements = Agreements.findOne({_id:agreementId, status:true,isDeleted:0});
       
        if (agreements) {
            return agreements;
        }else{
            return [];    
        }
    },
});
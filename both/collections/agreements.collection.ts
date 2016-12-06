import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { CollectionObject } from '../models/collection-object.model';

export interface PatientAgreement extends CollectionObject {}
export interface Agreement extends CollectionObject {}

export const PatientAgreements = new MongoObservable.Collection<PatientAgreement>('patient_agreements');

export const Agreements = new MongoObservable.Collection<Agreement>("agreements");




import { CollectionObject } from './collection-object.model';

export interface Patient extends CollectionObject {
    csvId: string;
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNum: number;
    groupId: number;
    personalId: number;
    company: string;
    insurer: string;
    guarantor: string;
    userId?: string;
    status?: {
        isDeleted: boolean;
    };
}
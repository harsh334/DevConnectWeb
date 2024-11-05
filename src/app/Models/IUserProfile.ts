import { Timestamp } from 'rxjs';

export interface IUserProfile {
  message: string;
  data: {
    age: number;
    createdAt: string;
    emailId: string;
    firstName: string;
    lastName: string;
    password: string;
    skills: string[];
    updatedAt: string;
    _v: number;
    _id: number;
  };
}

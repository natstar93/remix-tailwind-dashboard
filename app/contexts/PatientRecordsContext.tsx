import { createContext } from 'react';

export type PatientRecord = {
  firstName: string;
  lastName: string;
  vaccineDate: number
  vaccineType: string;
  nhsNumber: string;
  id: string;
};
const PatientRecordsContext = createContext<PatientRecord[]>([]);

export default PatientRecordsContext;

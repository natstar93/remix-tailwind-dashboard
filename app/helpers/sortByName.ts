import { PatientRecord } from '~/contexts/PatientRecordsContext';

const sortByName: (
  order: 'asc' | 'desc',
  unsortedRecords: PatientRecord[]
) => PatientRecord[] = (order, unsortedRecords) => {
  const isAscending = order === 'asc';
  const outputRecords = [...unsortedRecords];
  
  const comparefn = (record: PatientRecord, nextRecord: PatientRecord) => {
    if (
      record.lastName.toLocaleLowerCase() <
      nextRecord.lastName.toLocaleLowerCase()
    ) {
      return isAscending ? -1 : 1;
    }
    if (
      record.lastName.toLocaleLowerCase() >
      nextRecord.lastName.toLocaleLowerCase()
    ) {
      return isAscending ? 1 : -1;
    }
    return 0; // this could be extended to sort by firstName
  };

  outputRecords.sort(comparefn);
  return outputRecords;
};

export default sortByName;

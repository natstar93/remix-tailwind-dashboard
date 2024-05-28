import { PatientRecord } from '~/contexts/PatientRecordsContext';

const sortByName: (
  order: 'asc' | 'desc'
) => (record: PatientRecord, nextRecord: PatientRecord) => number =
  (order) => (record, nextRecord) => {
    const isAscending = order === 'asc';

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

const sortByDirection = (
  direction: 'asc' | 'desc',
  records: PatientRecord[]
) => {
  const sortedRecords = [...records];
  const sortByDir = sortByName(direction);
  sortedRecords.sort(sortByDir);

  return sortedRecords;
};

export const sortByAscending = (records: PatientRecord[]) => sortByDirection('asc', records);

export const sortByDescending = (records: PatientRecord[]) => sortByDirection('desc', records);


import { PatientRecord } from '~/contexts/PatientRecordsContext';
import {sortByAscending, sortByDescending} from '../sortByName';

describe('sortByName', () => {
  let testRecords: PatientRecord[];
  beforeEach(() => {
    testRecords = [
      {
        firstName: 'Pastino',
        lastName: 'de Pasta',
        vaccineDate: 1637877001,
        vaccineType: 'Pfizer',
        nhsNumber: '8832740435',
        id: '1',
      },
      {
        firstName: 'Montasio',
        lastName: 'Ubriaco',
        vaccineDate: 1637876041,
        vaccineType: 'Pfizer',
        nhsNumber: '2865797570',
        id: '2',
      },
      {
        firstName: 'Gelato',
        lastName: 'Al Cioccolato',
        vaccineDate: 1637877061,
        vaccineType: 'Pfizer',
        nhsNumber: '4584318425',
        id: '3',
      },
    ];
  });

  it('sorts records in ascending order', () => {
    const expectedRecords = [testRecords[2], testRecords[0], testRecords[1]];

    const sortedRecords = sortByAscending(testRecords);

    expect(sortedRecords).toEqual(expectedRecords);
  });

  it('sorts records in descending order', () => {
    const expectedRecords = [testRecords[1], testRecords[0], testRecords[2]];
    
    const sortedRecords = sortByDescending(testRecords);

    expect(sortedRecords).toEqual(expectedRecords);
  });
});

import { render, screen } from '@testing-library/react';

import PatientRecordsContext from '~/contexts/PatientRecordsContext';
import Patients from '../patients';

describe('Patients', () => {
  it('loads records correctly on render', async () => {
    const fakeData = [
      {
        firstName: 'Gelato',
        lastName: 'Al Cioccolato',
        vaccineDate: 1637877061,
        vaccineType: 'Pfizer',
        nhsNumber: '4584318425',
        id: '1',
      },
      {
        firstName: 'Pastino',
        lastName: 'de Pasta',
        vaccineDate: 1637877001,
        vaccineType: 'Pfizer',
        nhsNumber: '8832740435',
        id: '2',
      },
    ];
    render(
      <PatientRecordsContext.Provider value={fakeData}>
        <Patients />
      </PatientRecordsContext.Provider>
    );

    expect(await screen.findByText('de Pasta, Pastino')).toBeInTheDocument();
  });
});

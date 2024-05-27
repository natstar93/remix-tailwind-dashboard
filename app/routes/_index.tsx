import { useContext } from 'react';
import type { MetaFunction } from '@remix-run/node';

import PatientRecordsContext, {
  PatientRecord,
} from '../contexts/PatientRecordsContext';

export const meta: MetaFunction = () => {
  return [
    { title: 'accuBook Dashboard' },
    { name: 'description', content: 'Patient vaccination dashboard' },
  ];
};

export default function Index() {
  const records: PatientRecord[] = useContext(PatientRecordsContext);

  return (
    <main>
      <table>
        <tbody>
          {records?.map(
            ({ id, lastName, firstName, nhsNumber, vaccineType }) => (
              <tr key={id}>
                <td>{`${lastName}, ${firstName}`}</td>
                <td>{nhsNumber}</td>
                <td> {vaccineType} </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}

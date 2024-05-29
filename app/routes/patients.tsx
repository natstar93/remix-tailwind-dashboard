import { useContext, useEffect, useState } from 'react';
import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';

import PatientRecordsContext, {
  PatientRecord,
} from '../contexts/PatientRecordsContext';
import { sortByAscending, sortByDescending } from '~/helpers/sortByName';

export const meta: MetaFunction = () => {
  return [
    { title: 'accuBook Dashboard' },
    { name: 'description', content: 'Patient vaccination dashboard' },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const inputVal = data.get('searchQuery') || '';

  if (inputVal.toString().length > 1) {
    return redirect(`/patients?q=${inputVal}`);
  }

  return redirect('/patients');
}

export default function Patients() {
  const [status, setStatus] = useState<string>('Loading patient data');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [orderedRecords, setOrderedRecords] = useState<PatientRecord[]>([]);
  const records: PatientRecord[] = useContext(PatientRecordsContext);

  const onSortButtonClick = () => {
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const sortedRecords = isAscending
      ? sortByAscending(records)
      : sortByDescending(records);
    setOrderedRecords(sortedRecords);
    setStatus(records.length ? '' : 'No records found');
  }, [records, isAscending, setOrderedRecords]);

  return (
    <>
      <h1>Patient Vaccination Records</h1>
      <div className='flex justify-end '>
        <button className='text-white bg-black p-2' onClick={onSortButtonClick}>
          Sort by name (
          {isAscending ? <> &darr; descending</> : <>&uarr; ascending </>})
        </button>
      </div>
      <table className='size-full p-2 border-4 border-solid border-brand-green'>
        <thead>
          <tr>
            <th>Name</th>
            <th>NHS Number</th>
            <th>Type of Vaccination</th>
          </tr>
        </thead>
        <tbody>
          {orderedRecords.length ? (
            orderedRecords?.map(
              ({ id, lastName, firstName, nhsNumber, vaccineType }) => (
                <tr key={id}>
                  <td>{`${lastName}, ${firstName}`}</td>
                  <td>
                    {nhsNumber}
                  </td>
                  <td>
                    {vaccineType}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td className='p-4'>{status}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

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
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [orderedRecords, setOrderedRecords] = useState<PatientRecord[]>([]);
  const records: PatientRecord[] = useContext(PatientRecordsContext);

  const onSortButtonClick = () => {
    setIsAscending(!isAscending);
  };

  useEffect(() => {
  
    if (records.length) {
      const sortedRecords = isAscending
        ? sortByAscending(records)
        : sortByDescending(records);
      setOrderedRecords(sortedRecords);
    }
    else {
      setOrderedRecords(records)
    }
  }, [records, isAscending, setOrderedRecords]);

  return (
    <main>
      <div className='flex justify-end '>
        <button className='text-white bg-black p-2' onClick={onSortButtonClick}>
          Sort by name (
          {isAscending ? <> &darr; descending</> : <>&uarr; ascending </>})
        </button>
      </div>
      <table className='size-full'>
        <tbody>
          {orderedRecords.length ? orderedRecords.map(
            ({ id, lastName, firstName, nhsNumber, vaccineType }) => (
              <tr key={id}>
                <td className='border-y-2 border-l-2 border-solid border-brand-green'>{`${lastName}, ${firstName}`}</td>
                <td className='border-y-2 border-solid border-brand-green'>
                  {nhsNumber}
                </td>
                <td className='border-y-2 border-r-2 border-solid border-brand-green'>
                  {vaccineType}
                </td>
              </tr>
            )
          ) : <tr><td>No records</td></tr>}
        </tbody>
      </table>
    </main>
  );
}

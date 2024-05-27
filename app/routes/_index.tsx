import { useContext, useEffect, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';

import PatientRecordsContext, {
  PatientRecord,
} from '../contexts/PatientRecordsContext';
import sortByName from '~/helpers/sortByName';

export const meta: MetaFunction = () => {
  return [
    { title: 'accuBook Dashboard' },
    { name: 'description', content: 'Patient vaccination dashboard' },
  ];
};

export default function Index() {
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [orderedRecords, setOrderedRecords] = useState<PatientRecord[]>([]);
  const records: PatientRecord[] = useContext(PatientRecordsContext);

  const onSortButtonClick = () => {
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const sortedRecords = sortByName(isAscending ? 'asc' : 'desc', records);
    setOrderedRecords(sortedRecords);
  }, [records, isAscending, setOrderedRecords]);

  return (
    <main className='flex flex-col gap-4'>
      <div className='flex justify-end '>
        <button className='text-white bg-black p-2' onClick={onSortButtonClick}>
          Sort by name (
          {isAscending ? <> &darr; descending</> : <>&uarr; ascending </>})
        </button>
      </div>
      <table className='size-full'>
        <tbody>
          {orderedRecords?.map(
            ({ id, lastName, firstName, nhsNumber, vaccineType }) => (
              <tr key={id}>
                <td className='border-y-2 border-l-2 border-solid border-brand-green'>{`${lastName}, ${firstName}`}</td>
                <td className='border-y-2 border-solid border-brand-green'>{nhsNumber}</td>
                <td className='border-y-2 border-r-2 border-solid border-brand-green'>{vaccineType}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}

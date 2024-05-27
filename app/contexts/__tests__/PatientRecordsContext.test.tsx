import { useContext } from 'react';
import { renderHook } from '@testing-library/react';

import PatientRecordsContext from '../PatientRecordsContext';

describe('PatientRecordsContext', () => {
  it('has a default value of an empty array', () => {
    const { result } = renderHook(() => useContext(PatientRecordsContext));
    expect(result.current).toEqual([]);
  });
});

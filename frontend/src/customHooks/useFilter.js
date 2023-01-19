import { useEffect } from 'react';
import { useState } from 'react';
import { loadStays } from '../store/stay/stay.action';

export function useFilter(initialValue) {
  const [filter, setFilter] = useState(initialValue);

  useEffect(() => {
    console.log('filter has changed:', filter);
    loadStays(filter);
  }, [filter]);

  const updateFilter = (filterToSet) => {
    setFilter((prev) => ({ ...prev, ...filterToSet }));
  };

  return updateFilter;
}

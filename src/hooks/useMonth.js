import { useState } from 'react';
import { useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../services/utils';

export function useMonth(year, month) {
  const [days, setDays] = useState([]);
  useEffect(() => {
    const renderCalendar = async () => {
      const first = getFirstDayOfMonth(year, month);
      const arr = [];
      for (let i = 1; i <= first; i++) {
        arr.push(' ');
      }
      const numOfDays = getDaysInMonth(year, month);
      console.log(numOfDays, first);

      for (let i = 1; i <= numOfDays + 1; i++) {
        arr.push(i);
      }
      setDays(arr);
    };
    renderCalendar();
  }, [year, month]);
  return { days, setDays };
}

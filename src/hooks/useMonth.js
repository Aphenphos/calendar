import { useState } from 'react';
import { useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../services/utils';
import { useEvents } from './useEvents';

export function useMonth(year, month, calId) {
  const [days, setDays] = useState([]);
  const { events } = useEvents(calId);
  useEffect(() => {
    setDays([]);
    const renderCalendar = async () => {
      const first = getFirstDayOfMonth(year, month);
      const arr = [];
      for (let i = 1; i <= first; i++) {
        arr.push({ day: ' ' });
      }
      const numOfDays = getDaysInMonth(year, month);

      for (let i = 1; i <= numOfDays + 1; i++) {
        const curEvents = events.filter((e) => {
          return e.date.day === i && e.date.month === parseInt(month);
        });

        arr.push({
          day: i,
          event: curEvents,
        });
      }
      console.log(arr);
      console.log(events);
      setDays(arr);
    };
    renderCalendar();
  }, [year, month, events]);
  return { days, setDays };
}

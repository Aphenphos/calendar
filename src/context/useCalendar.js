import { createContext, useState } from 'react';

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [calendar, setCalendar] = useState('');
  return (
    <CalendarContext.Provider value={{ calendar, setCalendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };

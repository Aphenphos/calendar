import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CalendarContext } from '../../context/useCalendar';
import { UserContext } from '../../context/useUser';

export default function Event() {
  const { user } = useContext(UserContext);
  const { calendar } = useContext(CalendarContext);
  const [desc, setDisc] = useState('');

  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }
}

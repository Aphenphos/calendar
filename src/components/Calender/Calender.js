import React, { useContext } from 'react';
import { UserContext } from '../context/useUser';
import { Redirect } from 'react-router-dom';

export default function Calender() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return (
    <div>Calender</div>
  );
}

import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CalendarContext } from '../../context/useCalendar';
import { UserContext } from '../../context/useUser';

export default function Event() {
  const { user } = useContext(UserContext);
  const { calendar, setCalendar } = useContext(CalendarContext);
  const [desc, setDisc] = useState('');
  const [date, setDate] = useState('');

  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }

  const handleSubmit = async () => {
    const newEvent = {
      owner: calendar,
      description: desc,
    };

    //addNewEvent(newEvent)
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="description"
            onChange={(e) => {
              setDisc(e.target.value);
            }}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../../context/useUser';
import './Event.css';
import DatePicker from 'react-date-picker';



// import DatePicker from '@mui/x-date-pickers/DatePicker';


export default function Event() {
  // const { user } = useContext(UserContext);
  // const { calendar } = useContext(CalendarContext);
  const [desc, setDisc] = useState('');
  const [value, onChange] = useState(new Date());
  // const [date, setDate] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // if (!user) {const [date, setDate] = useState('');
  //   return <Redirect to="/auth/sign-in"></Redirect>;
  // }

  const handleSubmit = async () => {
    const newEvent = {
      
      description: desc,
      start: startDate,
      end: endDate,
    };

    // addNewEvent(newEvent)
  };

  return (
    <>
      <div>
        <DatePicker onChange={onChange} value={value} />

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

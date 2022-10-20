import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/useUser';
import './Event.css';
import DatePicker from 'react-date-picker';
import { addDate } from '../../services/events';
import { useCalendars } from '../../hooks/useCalendars';

export default function Event() {
  const { user } = useContext(UserContext);
  const [desc, setDisc] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { calendars } = useCalendars();
  const [selected, setSelected] = useState(null);
  const [mess, setMess] = useState('Event added');
  const [recur, setRecur] = useState(false);

  const selectedDateOption = new Date(selectedDate);
  const formattedDate = `${
    selectedDateOption.getMonth() + 1
  }/${selectedDateOption.getDate()}/${selectedDateOption.getFullYear()}`;

  const dateArr = formattedDate.split('/');

  const numberDate = dateArr.map(Number);

  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }

  const onChanges = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  const addDates = async (e) => {
    e.preventDefault();
    if (selected === null) {
      setMess('Please Select a Calendar');
      window.alert(`${mess}`);
    }
    if (recur === true) {
      await addDate({
        date: [numberDate[0], numberDate[1], null],
        calendar: selected,
        description: desc,
      });
    } else {
      await addDate({ date: numberDate, calendar: selected, description: desc });
      setMess(`Event Added ${desc}`);
      window.alert(`${mess}`);
    }
  };

  const setRecurring = (e) => {
    if (e.target.checked) {
      setRecur(true);
    } else {
      setRecur(false);
    }
  };

  return (
    <>
      <div className="event-page">
        <form onSubmit={addDates} className="input-form">
          <DatePicker onChange={onChanges} value={selectedDate} type="text" />
          Yearly? <input type="checkbox" onChange={setRecurring}></input>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option selected disabled hidden>
              Pick to add event.
            </option>
            {calendars.map((cal) => (
              <option key={cal.calId} value={cal.calId}>
                {cal.calName}
              </option>
            ))}
          </select>
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

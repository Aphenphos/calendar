import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/useUser';
import './Event.css';
import DatePicker from 'react-date-picker';

export default function Event() {
  const { user } = useContext(UserContext);
  const [desc, setDisc] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateOption = new Date(selectedDate);
  const formattedDate = `${
    selectedDateOption.getMonth() + 1
  }/${selectedDateOption.getDate()}/${selectedDateOption.getFullYear()}`;

  const dateArr = formattedDate.split('/');
  console.log(dateArr);

  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }

  const onChanges = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  return (
    <>
      <div>
        <DatePicker onChange={onChanges} value={selectedDate} type="text" />

        <form>
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

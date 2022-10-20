import { Switch, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Footer from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header';
import Calendar from './components/Calendar/Calendar';
import Profile from './components/Profile/Profiles';
import CreateCalendar from './CreateCalendar/CreateCalendar';
import Event from './components/Event/Event';
import { useContext } from 'react';
import { ThemeContext } from './context/useTheme';
import ChooseCalender from './components/ChooseCalender/ChooseCalender';
import EditCal from './components/EditCal/EditCal';


function App() {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <Header />
      <Switch>
        <Route path="/choose-calendar" component={ChooseCalender}></Route>
        <Route path="/auth/:type" component={Auth} />
        <Route path="/create-calendar" component={CreateCalendar} />
        <Route path="/edit-calendar" component={EditCal}/>
        <Route path="/create-event" component={Event}></Route>
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Calendar} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

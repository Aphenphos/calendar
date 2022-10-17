import { Switch, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth.js/Auth';
import Footer from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header';
import Calender from './components/Calender/Calender';
import Profile from './components/Profile/Profiles';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/calender" component={Calender} />
        <Route path="/auth/:type" component={Auth} />
        <Route path="/" component={Auth}/>
        <Route path='/profile' component={Profile} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;

import { createContext, useEffect, useState } from 'react';
import { getProfileData, getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);
  const [profile, setProfile] = useState();

  useEffect(() => {
    async function fetch() {
      let currentProfile = await getProfileData();
      console.log(currentProfile);
    }
    fetch();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

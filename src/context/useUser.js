import { createContext, useState } from 'react';
import { getProfileData, getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const currentProfile = getProfileData();
  const [user, setUser] = useState(currentUser);
  const [profile, setProfile] = useState(currentProfile);
  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import { createContext, useEffect, useState } from 'react';
import { getProfileData, getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);
  const [profile, setProfile] = useState();
  const [uloading, setuLoading] = useState(false);

  useEffect(() => {
    setuLoading(true);
    async function fetch() {
      let currentProfile = await getProfileData();
      setProfile(currentProfile);
      setuLoading(false);
    }
    fetch();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile, uloading, setuLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

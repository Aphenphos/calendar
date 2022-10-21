import { createContext, useEffect, useState } from 'react';
import { getProfileData, getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      let currentProfile = await getProfileData();
      setProfile(currentProfile);
      setLoading(false);
    }
    fetch();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

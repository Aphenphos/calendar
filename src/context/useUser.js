import { createContext, useEffect, useState } from 'react';
import { getProfileData, getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      new Promise((res) => {
        const timer = setTimeout((func) => {
          const profileData = null;
          return res(profileData);
        }, 3000);
        const profileData = getProfileData();
        clearTimeout(timer);
        return res(profileData);
      }).then((profileData) => {
        setProfile(profileData);
      });
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

import { useEffect, useState } from 'react';
import { getProfileData } from '../services/auth';
import { getUsers } from '../services/owners';

export function useUsers(calId) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const profile = await getProfileData();
      const data = await getUsers(calId);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].owner_id !== profile.id) {
          arr.push({
            id: data[i].id,
            cal_id: data[i].cal_id,
            owner_id: data[i].owner_id,
            prof_name: data[i].user_profiles.profile_name,
          });
          setUsers(arr);
          console.log(arr);
        }
      }
    }
    fetchData();
  }, [calId]);
  return { users, setUsers };
}

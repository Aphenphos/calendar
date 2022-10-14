import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/useUser';
import { authUser } from '../../services/auth';

export default function Auth() {
  const { type } = useParams();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    
  const submitAuth = async () => {
    const userResp = await authUser(email, password, type);
    setUser(userResp);
  };




  return (
    <div className='container'>
      <label>Email
        <input onChange={(e) => {
          setEmail(e.target.value);
        }} />
      </label>

      <label>Password
        <input onChange={(e) => {
          setPassword(e.target.value);
        }} />
      </label>
          
      <button onClick={submitAuth}>Submit</button>
          
    </div>
  );
}

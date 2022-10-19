import React, { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/useUser';
import { authUser } from '../../services/auth';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const { setUser, user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitAuth = async (e) => {
    e.preventDefault();
    const userResp = await authUser(email, password, type);
    setUser(userResp);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <form className="input-form">
        <label>
          Email:
          <input
            className="email-input"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label>
          Password:
          <input
            className="password-input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <span>
          Need an account? <Link to="/auth/sign-up">Sign up!</Link>
        </span>
        <button className="submit-button" onClick={submitAuth}>
          Submit
        </button>
      </form>
    </div>
  );
}

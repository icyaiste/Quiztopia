import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './createAccount.css';

interface UserData {
  username: string;
  password: string;
}

function CreateAccount() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const SubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData: UserData = { username, password };
    try {
      const response = await fetch(
        'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        console.error('Error in response');
        return;
      }
      const data = await response.json();
      console.log('Account created', data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main>
      <form onSubmit={SubmitForm}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </label>
        <button className="createAcc" type="submit">
          Create Account
        </button>
      </form>
      <p>Already have an account?</p>
      <button
        className="Login"
        type="button"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </main>
  );
}

export default CreateAccount;

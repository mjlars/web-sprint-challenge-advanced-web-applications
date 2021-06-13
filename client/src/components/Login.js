import React, { useState } from "react";
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from "react-router-dom";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  let initialState = {
    credentials: {
      username: '',
      password: '',
    }
  }
  
  const history = useHistory();
  
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({
      credentials: {
        ...formValues.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log('forms', formValues);
    axiosWithAuth()
      .post('/login', formValues.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.setIsLoggedIn(true);
        history.push('/bubblepage');
      })
      .catch(err => {
        console.log('error message: ', err);
      })
  }

  return (
      <div>
        use these credentials, they are valid
        username: 'Lambda School', password: ilessThanSymbol3Lambd4
        <form onSubmit={login}>
          <label>username</label>
          <input
            type="text"
            name="username"
            value={formValues.credentials.username}
            onChange={handleChange}
          />
          <label>password</label>
          <input
            type="password"
            name="password"
            value={formValues.credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
  );
};

export default Login;

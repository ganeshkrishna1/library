import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LoginAuth from '../Auth/LoginAuth';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [userType, setUserType] = useState('user'); // 'user' by default
  const navigate = useNavigate();
  const [errors, setError] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = LoginAuth(values);
    setError(validationErrors);

    if (validationErrors.email === '' && validationErrors.password === '') {
      try {
        const res = await axios.post('http://localhost:8080/api/auth/login', {
          ...values,
          userType: userType // Include userType in the request payload
        });

        if (res.data.Status === 'Success') {
          if (values.email === 'admin' && values.password === 'admin') {
            if (userType === 'admin') {
              localStorage.setItem('authenticatedUser', false);
              localStorage.setItem('authenticatedAdmin', true);
              alert("Admin Login Success");
            } else {
              localStorage.setItem('authenticatedUser', true);
              alert("User Login Success");
            }
          }
        }
      } catch (err) {
        console.log(err);
        alert("Invalid user click ok to register");
        navigate('/signup');
      }
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 loginHead'>
        <strong>Login</strong>
      </div>
      <br />
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-1 rounded w-25 loginForm'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input
                type='text'
                id='email'
                placeholder='Enter Email'
                name='email'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                name='password'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <div className='col-12 mt-3'  >
                <input 
                  type='radio'
                  id='user'
                  name='userType'
                  value='user'
                  checked={userType === 'user'}
                  onChange={handleUserTypeChange}
                />
                <label htmlFor='user'>User</label>
                <input
                  type='radio'
                  id='admin'
                  name='userType'
                  value='admin'
                  checked={userType === 'admin'}
                  onChange={handleUserTypeChange}
                />
                <label htmlFor='admin'>Admin</label>
              </div><br></br>
            <div className='row'>
              <div className='col-4'>
                <button type='submit' id='loginButton' className='btn btn-success w-100 rounded-0'>
                  Log in
                </button>
              </div>
              <div className='col-4'>
                <Link to='/signup' type='button' id='signupLink' className='btn btn-primary rounded-0'>
                  Sign up
                </Link>
              </div>
           
              <Outlet />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

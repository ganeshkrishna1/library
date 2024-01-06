import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LoginAuth from '../Auth/LoginAuth';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [userRole, setUserRole] = useState('user'); // 'user' by default
  const navigate = useNavigate();
  const [errors, setError] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = LoginAuth(values);
    setError(validationErrors);

    if (validationErrors.email === '' && validationErrors.password === '') {
      try {
        const res = await axios.post('http://localhost:8080/api/auth/login', {
          email: values.email,
          password: values.password,
          userRole: userRole // Include userRole in the request payload
        });

        if (res.data.Status === 'Success') {
          // Authentication successful
          if (userRole === 'admin') {
            // Admin authentication logic
            localStorage.setItem('authenticatedUser', false);
            localStorage.setItem('authenticatedAdmin', true);
            navigate('/adminhome');
          } else {
            // User authentication logic
            localStorage.setItem('authenticatedUser', true);
            localStorage.setItem('authenticatedAdmin', false);
            navigate('/home');
          }
        } else {
          // Authentication failed
          alert("Invalid credentials");
        }
      } catch (err) {
        console.log(err);
        alert("Invalid user, click OK to register");
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
            <div className='col-12 mt-3'>
              <input
                type='radio'
                id='user'
                name='userRole'
                value='user'
                checked={userRole === 'user'}
                onChange={handleUserRoleChange}
              />
              <label htmlFor='user'>User</label>
              <input
                type='radio'
                id='admin'
                name='userRole'
                value='admin'
                checked={userRole === 'admin'}
                onChange={handleUserRoleChange}
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

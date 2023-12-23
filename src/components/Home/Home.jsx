import React from 'react';
import {Link,useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();

    function HandleLogout(){
        navigate('/login');
        localStorage.removeItem('authenticatedUser');
        localStorage.removeItem('authenticatedAdmin');
      }
  return (
    <>
    <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Library</strong>
        <Link to="/login">
                <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>    
              </Link>
      </div>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 welcomeHead'>
        <strong>Welcome, User! You're Logged In Successfully</strong>
      </div>
    </>
  );
}

export default WelcomePage;

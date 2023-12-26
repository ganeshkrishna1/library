import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import "./Adminhome.css";
function Adminbook() {
  const [values, setValues] = useState({
    title: '',
    author: '',
    imageUrl: '',
    pages: '',
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  function HandleLogout(){
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  }
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedAdmin');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/api/Admin/addbook', values)
      .then((res) => {
        navigate('/adminhome');
      })
      .catch((err) => console.error(err.response));
  };

  function handleLogout() {
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  }

  return (
    <div className='body'>
    <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
      <div className="container-fluid">
        <a className="nav-title">Library</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/adminregister" className="nav-link active" id='adminAcademy' aria-current="page">AddUser</Link>
            </li>
            <li className="nav-item">
              <Link to="/adminbook" className="nav-link" id='adminCourse'>AddBook</Link>
            </li>
            <li className="nav-item">
              <Link to="/Adminstudents" className="nav-link" id='adminStudents'>Dashboard</Link>
            </li>
            <li className="nav-item">
            <Link to="/login" className="nav-link" id='adminStudents' onClick={HandleLogout}>Logout</Link>
           </li>
          </ul>
         
        </div>                
      </div>
      <Outlet />
    </nav>
      <div className="d-flex justify-content-center align-items-center vh-100 addpage">
        <div className="p-1 rounded w-25 border addform">
          <h2>Add Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter book title"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                placeholder="Enter the author name"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                placeholder="Enter the book image Url"
                autoComplete="off"
                required
                onChange={handleInput}
              />
            </div>
    
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="pages"
                name="pages"
                required
                placeholder="Enter no. of pages"
                onChange={handleInput}
              />
            </div>
                  <div className="mb-3">
              <button type="submit" id="addButton" className="btn btn-success w-10">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adminbook;
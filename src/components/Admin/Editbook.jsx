import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

function EditBook() {
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    imageUrl: '',
    pages: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  function HandleLogout(){
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedAdmin');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/Admin/getdetails/' + id)
      .then((res) => {
        if (res.data.Status === 'Success') {
          const book = res.data.Result;

          setFormValues({
            title: book.title,
            author: book.author,
            imageUrl: book.imageUrl,
            pages: book.pages,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put('http://localhost:8080/api/admin/updatebook/' + id, formValues)
      .then((res) => {
        navigate('/adminhome');
      })
      .catch((err) => console.log(err));
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
              <Link to="/admindashboard" className="nav-link" id='adminStudents'>Dashboard</Link>
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
          <h2>Update Book Details</h2><br></br>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={formValues.title}
                className="form-control"
                id="editTitle"
                name="title"
                placeholder="Enter Book Title"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={formValues.author}
                className="form-control"
                id="editAuthor"
                name="author"
                placeholder="Enter Author Name"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                value={formValues.imageUrl}
                className="form-control"
                id="editImageUrl"
                name="imageUrl"
                placeholder="Enter Image Url"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={formValues.pages}
                className="form-control"
                id="editPages"
                name="pages"
                placeholder="Enter Number of Pages"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                id="updateButton"
                className="btn btn-success w-10"
              >
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBook;

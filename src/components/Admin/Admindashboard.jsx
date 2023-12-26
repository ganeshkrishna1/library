import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/api/Admin/getusers')
      .then(res => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setOriginalData(res.data.Result);
          setFilteredData(res.data.Result); // Initialize filteredData with original data
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedAdmin');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = originalData.filter((item) =>
      item.id.toString().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/Admin/deleteuser/${id}`)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
  }

  function HandleLogout() {
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  }

  return (
    <>
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
      </div>
      <br></br><br></br>
      <div className="template_Container">
        <div className="row justify-content-center mb-3">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="input-group">
              <input
                id="searchUser"
                type="text"
                className="form-control"
                placeholder="Type here user ID to search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
              <button className="btn btn-success" type="submit" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <br></br>
        {data.length > 0 ? (
          <center>
            <table className="gridTable">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>User Role</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val) => (
                  <tr key={val.id}>
                    <td>{val.id} </td>
                    <td>{val.userRole}</td>
                    <td>{val.username} </td>
                    <td>{val.email}</td>
                    <td>{val.mobileNumber}</td>
                    <td>
                      <Link to={`/edituser/${val.id}`} className="editButton" id="adminEditBook"><FaEdit /></Link>
                      <button className="deleteButton" id="adminDeleteBook" onClick={() => handleDelete(val.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <br></br>
    </>
  );
}

export default AdminUsers;

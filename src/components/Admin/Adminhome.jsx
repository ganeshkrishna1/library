import React, { useEffect,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Adminhome.css";
import { FaEdit, FaTrash } from 'react-icons/fa';
function Adminhome() {
  const [data,setData]=useState([])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
      axios.get('http://localhost:8080/api/Admin/getdetails')
      .then(res=>{
        if(res.data.Status==="Success"){
          console.log(res.data.Result)
          setData(res.data.Result);
        }else(
          alert("Error")
        )
      })
      .catch(err=>console.log(err));
  },[])
  const navigate = useNavigate();
  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
    function HandleLogout(){
      navigate('/login');
      localStorage.removeItem('authenticatedUser');
      localStorage.removeItem('authenticatedAdmin');
    }
  const handleSearch = (event) => {
    event.preventDefault();
    // Filter the data based on the search query
    const filteredData = data.filter(item =>
      item.academyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };
  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/api/Admin/deleteacademy/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        window.location.reload(true);
      }
    })
    .catch(err => console.log(err));
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
        <div></div>
      </div>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Type here to search Academy"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
          <button className="btn btn-success w-10" type="submit" onClick={handleSearch}>Search</button>
        </div>
        <div className="template_Container">
          {data.length > 0 ? (
            data.map((val) => {
              return (
                <div className="template" key={val.id} id="AcademyGrid">
                  <img src={val.imageUrl} alt="" />
                  <h3>{val.academyName}</h3>
                  <p className="place">Place: {val.academyLocation} </p>
                  <button onClick={e => handleDelete(val.id)} id="deleteAcademy" class="deleteButton" type="button"><FaTrash /></button>
                  <Link to={`/editacademy/`+val.id} id="editAcademy" class="editButton" type="button"><FaEdit /></Link>
                </div>
              );
            })
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Adminhome;
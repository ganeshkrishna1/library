import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';

function WelcomePage() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/Admin/getbooks')
      .then(res => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);

  function HandleLogout() {
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  }

  const handleSearch = (event) => {
    event.preventDefault();
    // Filter the data based on the search query
    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/Admin/deletebook/${id}`)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          window.location.reload(true);
        }
      })
      .catch(err => console.log(err));
  };

  const handleAddToCart = (id, title) => {
    // Sending a POST request to add the item to the cart
    axios.post('http://localhost:8080/api/Admin/addcart', {
      BookID: id,
      Title: title,
    })
    .then(response => {
      console.log(response.data);
      // You can handle the response as needed
      console.log(`Book with ID ${id} added to cart`);
      navigate("/cart")
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
    });
  };

  return (
    <>
      <div className='body'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
          <div className="container-fluid">
            <a className="nav-title">Library</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/home" className="nav-link active" id='adminAcademy' aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link" id='adminStudents'>Cart</Link>
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
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Type here to search book"
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
                  <h3>{val.title}</h3>
                  <p>Author: {val.author} </p>
                  <p>Pages: {val.pages}  </p>
                  <button
                    className="btn btn-primary"
                    id="addcart"
                    onClick={() => handleAddToCart(val.id, val.title)}
                  >
                    <FaShoppingCart className="cart-icon" />
                    Add
                  </button>
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

export default WelcomePage;

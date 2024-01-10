import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import './style.css';

const About = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  const buttonTextRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://randomuser.me/api/?results=5');
      const data = await response.json();
      setUsers(data.results);
    };

    fetchData();
  }, []); 

  useEffect(() => {
    buttonTextRef.current.innerText = showUsers ? 'Hide' : 'Show';
  }, [showUsers]);

  return (
    <div>
      <h2>About Us</h2>
      <button onClick={() => setShowUsers(!showUsers)} ref={buttonTextRef}>
        Hide Users
      </button>

      {showUsers &&
        users.map((user, index) => (
          <div key={index} className="user">
            <img src={user.picture.thumbnail} alt={user.name.first} />
            <p>{`${user.name.first} ${user.name.last}`}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{`${user.location.city}, ${user.location.country}`}</p>
          </div>
        ))}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact:</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

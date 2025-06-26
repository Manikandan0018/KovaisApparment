import './output.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';

import Barber from './barber/barber';
import Spa from './spa/spa';
import Hotel from './RoomSearch/RoomSearch';
import SearchResults from './RoomSearch/SearchResults';
import Gym from './gym/gym';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
import ScrollToTop from './ScrollToTop.js';
import Header from './components/Header.js';
import About from './components/About/About.js';
import Profile from './components/Profile';
import ServiceInfo from './barber/ServiceInfo';
import BookedOrders from './components/BookedOrders';
import History from './components/History';

const AppRoutes = ({ user, setUser, handleLogin, handleLogout }) => {
  const location = useLocation();

  const hideOnRoutes = ['/login', '/signup', '/bookedOrders', '/history'];
  const shouldShowHeaderFooter = !hideOnRoutes.includes(location.pathname);

  const handleScroll = () => {
    const section = document.getElementById("homeCards");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ScrollToTop />

      {shouldShowHeaderFooter && (
        <Header user={user} onLogout={handleLogout} ScrollDown={handleScroll} />
      )}

      <Routes>
        <Route path="/signup" element={<Signup setUser={handleLogin} />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/barber" element={<Barber user={user} setUser={setUser} />} />
        <Route path="/spa" element={<Spa user={user} setUser={setUser} />} />
        <Route path="/RoomSearch" element={<Hotel />} />
        <Route path="/search-results" element={<SearchResults user={user} setUser={setUser} />} />
        <Route path="/gym" element={<Gym user={user} setUser={setUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/service-info/:id" element={<ServiceInfo />} />
        <Route path="/bookedOrders" element={<BookedOrders user={user} />} />
        <Route path="/history" element={<History />} />
      </Routes>

      {shouldShowHeaderFooter && (
        <footer className="footer">
          <MDBFooter className="text-center text-lg-left">
            <MDBContainer className="p-4 pb-0">
              <form>
                <MDBRow className="d-flex justify-content-center">
                  <MDBCol size="auto" className="mb-4 mb-md-0">
                    <p className="pt-2">
                      <strong>
                        2024 KOVAIS. All Rights Reserved. | Contact: 9234567891 |
                        Email: info@kovaisbeauty.com
                      </strong>
                    </p>
                  </MDBCol>
                  <MDBCol md="5" size="12" className="mb-4 mb-md-0">
                    <MDBInput type="text" id="form5Example2" label="Email address" />
                  </MDBCol>
                  <MDBCol size="auto" className="mb-4 mb-md-0">
                    <button className="bg-green-500 w-28 h-10">Send</button>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBContainer>
          </MDBFooter>
        </footer>
      )}
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1500 });

    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    setUser(userData);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    window.location.reload();
  };

  if (showSplash) {
    return (
      <div className="splash-screen d-flex align-items-center justify-content-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Router>
      <AppRoutes
        user={user}
        setUser={setUser}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Router>
  );
};

export default App;

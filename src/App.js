import './index.css'; // or './output.css' depending on your setup
import './output.css';

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';

import {
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barber from './barber/barber';
import Spa from './spa/spa';
import Hotel from './RoomSearch/RoomSearch';
import SearchResults from './RoomSearch/SearchResults';
import Gym from './gym/gym';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ScrollToTop from './ScrollToTop';
import Header from './components/Header.js';
import About from './components/About/About';
import Profile from './components/Profile';
import ServiceInfo from './barber/ServiceInfo';
import BookedOrders from './components/BookedOrders';
import History from './components/History'
import AOS from 'aos';
import 'aos/dist/aos.css';


const App = () => {
  const [user, setUser] = useState(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // const [userId, setUserId] =useState([])

  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true); // splash screen for 3s
 

  // ✅ Load user from localStorage and handle loading state

    useEffect(() => {
      AOS.init({ duration: 1500 });
    
      const splashTimeout = setTimeout(() => {
        setShowSplash(false);
        setLoading(false);
      }, 3000); // 3 seconds
    
      return () => clearTimeout(splashTimeout);
    }, []);
    
  
  const handleLogin = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    setUser(userData);
    window.location.reload()
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    window.location.reload()
  };

  if (showSplash) {
    return (
      <div className="splash-screen d-flex align-items-center justify-content-center">
        <div className="loader"></div> {/* Add loading spinner */}
      </div>
    );
  }
  

    const handleScroll = () =>{
      const section = document.getElementById("homeCards");
      section.scrollIntoView({ behavior: "smooth" });
    }

  return (
    <Router>
      <ScrollToTop />
      {/* <Header user={user} onLogout={handleLogout} /> */}
      {/* Hide Header only on Login and Signup pages */}
      {window.location.pathname !== "/login" &&
       window.location.pathname !== "/signup" &&  
        <Header  user={user} onLogout={handleLogout} ScrollDown={handleScroll}/>  
       }

      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/signup" element={<Signup setUser={handleLogin} />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />

        <Route path="/home" element={<Home user={user} setUser={setUser}/>} />
        
        <Route path="/barber" element={<Barber user={user} setUser={setUser}/>} />
        <Route path="/spa" element={<Spa user={user} setUser={setUser}/>} />
        <Route path="/RoomSearch" element={<Hotel />} />
        <Route path="/search-results" element={<SearchResults user={user} setUser={setUser}/>} />
        <Route path="/gym" element={<Gym user={user} setUser={setUser}/>} />
        <Route path="/about" element={<About/>}/>  
        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>}/>  
        <Route path="/service-info/:id" element={<ServiceInfo />}/>  
        <Route path="/bookedOrders" element={<BookedOrders user={user} />} />
        <Route path="/history" element={<History/>}/>
      </Routes>

      {/* Footer */}
      {window.location.pathname !== "/login" && 
      window.location.pathname !== "/signup" && 
      window.location.pathname !== "/bookedOrders" &&
      window.location.pathname !== "/history" &&
       <footer className="footer">
      <MDBFooter  className='text-center text-lg-left'>
      <MDBContainer className='p-4 pb-0'>
        <form action=''>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <p className='pt-2'>
                <strong> 2024 KOVAIS. All Rights Reserved. | Contact: 9234567891 | Email: info@kovaisbeauty.com | For any questions or feedback, feel free to email us anytime.</strong>
              </p>
            </MDBCol>

            <MDBCol md='5' size='12' className='mb-4 mb-md-0'>
              <MDBInput type='text' id='form5Example2' label='Email address' />
            </MDBCol>

            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <button className='bg-green-500 w-28 h-10'>Send</button>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
     
    </MDBFooter>



     </footer>
      }

     
    </Router>
  );
};

export default App;

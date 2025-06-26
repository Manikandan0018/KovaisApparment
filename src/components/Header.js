import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Image/logo.jpg";
import { FaHotel, FaCut, FaSpa, FaDumbbell } from "react-icons/fa";
import { BsArrowDownRightSquareFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { ImProfile } from "react-icons/im";

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [point, setPoint] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) setCurrentUser(storedUser);

    const fetchPoints = () => {
      const updatedUser = JSON.parse(localStorage.getItem("signedUpUser"));
      if (updatedUser) setPoint(updatedUser);
    };

    fetchPoints();
    window.addEventListener("storage", fetchPoints);
    return () => window.removeEventListener("storage", fetchPoints);
  }, [navigate]);

  const handleNavigation = (path) => navigate(path);

  const handleAuthClick = () => {
    if (currentUser) {
      localStorage.removeItem("loggedInUser");
      setCurrentUser(null);
      navigate("/");
    } else {
      navigate("/login");
      window.location.reload();
    }
  };

  const BookingLi = ()=>{
    setShowDropdown(!showDropdown)
  }

  return (
    <div className="w-full bg-black z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <img src={logo} alt="Logo" className="h-10 w-10 object-cover rounded-full" />
          <span className="ml-2 text-white font-bold text-lg">KOVAIS</span>
<input
  type="text"
  id="search-navbar"
  placeholder="Search..."
  className="block ml-8 w-64 focus:w-96 transition-all duration-300 ease-in-out p-2 ps-10 text-sm rounded-lg border-2 border-gray-300 focus:border-blue-500 outline-none bg-white text-gray-900 shadow-sm focus:shadow-md dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-blue-400 dark:shadow-md"
/>


        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setExpanded(!expanded)}
        >
          ☰
        </button>

        <nav className={`${expanded ? "block" : "hidden"} md:flex md:items-center w-full md:w-auto bg-black text-white md:bg-transparent`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 md:items-center">
            <li>
              <button onClick={() => handleNavigation("/")} className="w-20 md:w-auto text-center relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out rounded shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 ">
                <span className="relative z-10">Home</span>
              </button>
            </li>

            <li>
              <button onClick={() => handleNavigation("/about")} className="w-20 md:w-auto text-center relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out rounded shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600">
                <span className="relative z-10">About</span>
              </button>
            </li>

            <li className="relative group cursor-pointer">
              <span onClick={BookingLi} className="hover:text-gray-400">Booking ▾</span>
              {showDropdown && (
                <ul className="absolute left-0 bg-white text-black mt-2 rounded shadow-md z-50">
                  <li onClick={() => handleNavigation("/search-results")} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"><FaHotel className="mr-2" /> Hotels</li>
                  <li onClick={() => handleNavigation("/barber")} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"><FaCut className="mr-2" /> Barber Shop</li>
                  <li onClick={() => handleNavigation("/spa")} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"><FaSpa className="mr-2" /> Spa Center</li>
                  <li onClick={() => handleNavigation("/gym")} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"><FaDumbbell className="mr-2" /> Gym</li>
                </ul>
              )}
            </li>

            {currentUser && (
              <li className="flex items-center space-x-2 cursor-default">
                <img src={point.emblem_url} alt="Medal" className="w-6 h-6" />
                <span>{point.points} points</span>
              </li>
            )}

            {currentUser && (
              <li className="relative group cursor-pointer">
                <span className="hover:text-gray-400">Profile ▾</span>
                {showDropdown && (
                  <ul className="absolute left-0 bg-white text-black mt-2 rounded shadow-md z-50">
                    <li onClick={() => handleNavigation("/profile")} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"><ImProfile className="mr-2" /> Profile</li>
                    <li onClick={() => { handleNavigation("/bookedOrders"); window.location.reload(); }} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"><BsArrowDownRightSquareFill className="mr-2" /> Booked Orders</li>
                    <li onClick={() => { handleNavigation("/history"); window.location.reload(); }} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"><MdWorkHistory className="mr-2" /> History</li>
                    <li className="flex justify-center px-4 py-2">
                      <button onClick={() => { handleAuthClick(); setExpanded(false); }} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                        Log out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {!currentUser && (
              <li>
                <button onClick={handleAuthClick} className="bg-blue-500 px-4 py-1 text-white rounded hover:bg-blue-600">
                  Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;

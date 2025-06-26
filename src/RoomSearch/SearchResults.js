import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import Swal from 'sweetalert2'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import AOS from "aos";
import "aos/dist/aos.css"
import { useForm } from "react-hook-form";
// import ScrollToTop from '../ScrollToTop';


// import LoginModal from "../LoginModal"

const SearchResults = ({ user, setUser }) => {
  const location = useLocation();
  const { location: city, checkInDate, checkOutDate, guestsInfo } = location.state || {};
  const { selectedRoomType } = location.state || {};
  const [selectedRoomTypeState, setSelectedRoomType] = useState(selectedRoomType || 'All');
  const [roomCounts, setRoomCounts] = useState([1]); // Initialize counts for three room types
  const [guestCounts, setGuestCounts] = useState([1]); // Initialize guest counts for three room types
  const [showModal, setShowModal] = useState(false); // Modal state to control its visibility
  const [status, setStatus] = useState("");
  const [paytype, setPaytype] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000)); // Tomorrow
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [booked, setBooked] = useState("booked")
  const [username, setUsername] = useState("")
  const [availableRooms, setAvailableRooms] = useState(10); // Fetched from API
  // const [user, setUser] = useState({ username: "", password: "" , email: ""});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [point, setPoint] = useState()
  const [value, setValue] = useState()
  const [selectedOptions, setSelectedOptions] = useState({});
  // const [checkInFocused, setCheckInFocused] = useState(false);
  // const [checkOutFocused, setCheckOutFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };


  // const [user, setUser] = useState(null);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const { rooms, selectedRoomType, guestsInfo } = location.state || {};

  // const [searchFilters, setSearchFilters] = useState({
  //   selectedRoomType: selectedRoomType || "All",
  //   checkIn: new Date(),
  //   checkOut: new Date(Date.now() + 86400000),
  //   guestsInfo: guestsInfo || [],
  // });

  // const [bookingInfo, setBookingInfo] = useState({
  //   selectedRoom: null,
  //   roomCounts: [1],
  //   guestCounts: [1],
  //   totalAmount: 0,
  //   status: "",
  //   paytype: "",
  //   booked: "booked",
  // });



  const rooms = [
    {
      id: 1,
      type: 'Delux Room',
      title: 'Delux Room',
      description: 'A luxurious delux room with stunning views and modern amenities.',
      price: '₹2,591',
      originalPrice: '₹4,000',
      taxes: '₹788 taxes & fees',
      rating: '3.7 Very Good',
      location: 'Gobichettypalayam',
      imgSrc: 'https://www.dreaminternationalhotel.com/images/subpackage/0NNhP-sd2.jpg',
      amenities: ['Restaurant', 'Intercom', 'Room Service', 'Power Backup'],
    },
    // {
    //   id: 2,
    //   type: 'Super Delux Room',
    //   title: 'Super Delux Room',
    //   description: 'Experience ultimate comfort in our super delux room.',
    //   price: '₹3,200',
    //   originalPrice: '₹5,000',
    //   taxes: '₹900 taxes & fees',
    //   rating: '4.1 Excellent',
    //   location: 'Panjim, Goa',
    //   imgSrc: 'https://jcresidency.com/jc_kodai/images/rooms/super-deluxe-room-1.jpg',
    //   amenities: ['Restaurant', 'Intercom', 'Room Service', 'WiFi'],
    // },
    // {
    //   id: 3,
    //   type: 'Premium Room',
    //   title: 'Premium Room',
    //   description: 'Enjoy a premium experience with top-notch facilities and service.',
    //   price: '₹4,000',
    //   originalPrice: '₹6,000',
    //   taxes: '₹1,000 taxes & fees',
    //   rating: '4.5 Outstanding',
    //   location: 'Panjim, Goa',
    //   imgSrc: 'https://royalmhotels.com/uploads/rooms_types/gallery/1170x780/premium.jpg',
    //   amenities: ['Restaurant', 'Pool', 'Gym', 'WiFi'],
    // },
  ];

  const images = [
    {
      img: "https://5.imimg.com/data5/WC/QH/LY/GLADMIN-44986430/07-500x500.jpg",
      // title: "AC Room",
      title: "Common Area",
      description: "Fully air-conditioned rooms available",
    },
    {
      img: "https://img.freepik.com/premium-photo/restaurant-food-restaurant-menu-photos-menu_830198-777.jpg?semt=ais_hybrid",
      title: "Restaurant",
      description: "Enjoy delicious meals in our restaurant",
    },
    {
      img: "https://media.istockphoto.com/id/1372592207/photo/man-on-exercise-bike.jpg?s=612x612&w=0&k=20&c=Yn9s4WUqPzlgQxb-PFBbS9bUfs6zKk0h8wmy2YE5vgM=",
      title: "Gym",
      description: "Stay fit with our well-equipped gym",
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1500 })
  }, [])

  const maxGuestsPerRoom = 3;
  const maxRooms = 10; // Maximum rooms allowed



  // const handleCheckInChange = (e) => {
  //   const newCheckInDate = e.target.value;
  //   setCheckIn(newCheckInDate);  // Update the check-in date
  // };

  // const handleCheckOutChange = (e) => {
  //   const newCheckOutDate = e.target.value;
  //   setCheckOut(newCheckOutDate);  // Update the check-out date
  // };

  // const handleRoomSelectChange = (e) => {
  //   const selectedValue = e.target.value;
  //   const [roomsSelected] = selectedValue.split(' ').map(Number); // Extract the number of rooms

  //   // Set room counts for all room types to the selected value
  //   const updatedRoomCounts = Array(rooms.length).fill(roomsSelected);
  //   setRoomCounts(updatedRoomCounts);

  //   // Set guest counts based on the new room counts
  //   const updatedGuestCounts = updatedRoomCounts.map(count => Math.min(count * maxGuestsPerRoom, 3));
  //   setGuestCounts(updatedGuestCounts);
  // };

  const sortedRooms = rooms.slice().sort((a, b) => {
    if (a.type === selectedRoomTypeState) return -1; // Selected room type first
    if (b.type === selectedRoomTypeState) return 1;
    return 0;
  });

  const handleShowModal = (room, index) => {
    if (!room) {
      console.error("Error: Room is undefined!");
      return;
    }

    const roomPrice = room.price.replace("₹", "").replace(",", ""); // Clean price
    const totalAmount = roomCounts[index] * parseFloat(roomPrice); // Calculate total price

    setSelectedRoom({
      ...room,
      roomCount: roomCounts[index],
      guestCount: guestCounts[index],
      totalAmount: totalAmount,
    });

    setShowModal(true);
  };

  const signUp = async () => {
    try {
      const formattedData = {
        name: user.username,
        email: user.email,
        password: user.password,
      };

      const response = await axios.post(
        //  "https://1c9e-2409-408d-618-658e-15f8-262a-6616-c57e.ngrok-free.app/kovais/create-customer/",
        "https://api.capture360.ai/kovais/create-customer/",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      console.log("Signup Success:", response.data);
      localStorage.setItem("signedUpUser", JSON.stringify(formattedData));
      alert("Account Created Successfully!");
      // navigate("/login");
      setShowLoginModal(false);
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.error || "Sign-Up Failed. Please try again.");
      setShowLoginModal(true);
    }
  };

  const verify = (room, index) => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      handleShowModal(room, index)
      setShowLoginModal(false);
      setShowModal(true); // ✅ Show payment modal
    } else {
      console.log("No user is logged in. Showing login modal.");
      setShowLoginModal(true);
    }
  };

  const loginUser = async () => {
    // if (!user.username || !user.password) {
    //   setErrorMessage("Please enter both username and password.");
    //   return;
    // }

    setLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      console.log("Sending Data:", user);

      const response = await axios.post(
        "https://api.capture360.ai/kovais/customer-login/",
        // "https://4fe1-59-97-51-97.ngrok-free.app/kovais/customer-login/",
        {
          username: user.username,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Login Success:", response.data);

      // Store user data in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      window.location.reload()
      // Simulate a short delay for UX
      setTimeout(() => {
        alert("Login Successful!");
        setIsLoggedIn(true);
        setShowLoginModal(false); // Close the modal
      }, 500);

    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.login || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Fetch available rooms dynamically
  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get(
        "https://api.capture360.ai/kovais/room-count/",
        // "https://4fe1-59-97-51-97.ngrok-free.app/kovais/room-count/",
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

      console.log("Fetched Available Rooms:", response.data.available_room_count);
      setAvailableRooms(response.data.available_room_count); // Update available count
    } catch (error) {
      console.error("Error fetching available rooms:", error);
    }
  };

  // Fetch room availability on component mount
  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  const requestOptions = [
    { id: '102', label: 'Late check-in', showTime: true },
    { id: '103', label: 'Early check-in', showTime: true },
    { id: '106', label: 'Extra beds', showInput: true },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // // Recalculate amount dynamically (dummy function, replace with actual logic)
  // const recalculateAmount = (updatedCounts) => {
  //   console.log("Recalculating total price for:", updatedCounts);
  // };

  // Increment Room Count
  const incrementRoom = async (index) => {
    const totalBookedRooms = roomCounts.reduce((sum, count) => sum + count, 0);

    if (totalBookedRooms < maxRooms) { // Check if rooms are still available
      const updatedCounts = [...roomCounts];
      updatedCounts[index] += 1;
      setRoomCounts(updatedCounts);

      // Adjust guest count dynamically
      const updatedGuests = [...guestCounts];
      const maxGuests = updatedCounts[index] * maxGuestsPerRoom;

      if (updatedGuests[index] < maxGuests) {
        updatedGuests[index] += 1;
      }

      setGuestCounts(updatedGuests);
      recalculateAmount(updatedCounts);

      // Fetch latest available count dynamically
      await fetchAvailableRooms();
    } else {
      console.warn("No more rooms available to book!");
    }
  };

  // Decrement Room Count
  const decrementRoom = async (index) => {
    const updatedCounts = [...roomCounts];
    if (updatedCounts[index] > 1) {
      updatedCounts[index] -= 1;
    }
    setRoomCounts(updatedCounts);

    // Adjust guest count if it exceeds the new room capacity
    const updatedGuests = [...guestCounts];
    const maxGuests = updatedCounts[index] * maxGuestsPerRoom;
    if (updatedGuests[index] > maxGuests) {
      updatedGuests[index] = Math.min(updatedGuests[index], maxGuests);
    }
    setGuestCounts(updatedGuests);
    recalculateAmount(updatedCounts);

    // Fetch latest available count dynamically
    await fetchAvailableRooms();
  };

  // Increment guest count for a specific room type
  const incrementGuest = (index) => {
    const updatedGuests = [...guestCounts];
    const maxGuests = roomCounts[index] * maxGuestsPerRoom;
    if (updatedGuests[index] < maxGuests) {
      updatedGuests[index] += 1;
    }
    setGuestCounts(updatedGuests);
  };

  // Decrement guest count for a specific room type
  const decrementGuest = (index) => {
    const updatedGuests = [...guestCounts];
    if (updatedGuests[index] > 1) {
      updatedGuests[index] -= 1;
    }
    setGuestCounts(updatedGuests);
  };

  // const filteredRooms = selectedRoomType === 'All'
  //   ? rooms
  //   : rooms.filter(room => room.type === selectedRoomType);

  const recalculateAmount = (updatedRoomCounts) => {
    let total = 0;

    if (!rooms || rooms.length === 0) return; // Check if rooms is empty

    updatedRoomCounts.forEach((count, index) => {
      if (rooms[index]) { // Ensure the room exists
        const roomPrice = parseInt(rooms[index].price.replace('₹', '').replace(',', ''));
        total += count * roomPrice;
      }
    });

    setTotalAmount(total);
  };

  useEffect(() => {
    if (status && paytype) {
      setTimeout(() => {
        if (paytype === "offline") {
          handleFreeService();
        } else if (paytype === "online") {
          handlePayupi();
        }
      }, 500);
    }
  }, [status, paytype]);

  const usePoints = () => {
    let pointsToUse = parseInt(value);

    if (isNaN(pointsToUse) || pointsToUse <= 0) {
      alert("Enter a valid number of points.");
      return;
    }

    if (pointsToUse > point) {
      alert(`You only have ${point} points. Enter a valid amount.`);
      return;
    }

    // Deduct points
    let newBalance = point - pointsToUse;
    setPoint(newBalance);
    localStorage.setItem("singedUpUser", JSON.stringify(newBalance));

    alert(`You used ${pointsToUse} points. Remaining Balance: ${newBalance} points.`);
    setValue(""); // Reset input field
  };


  const handleCheckIntoChange = (date) => {
    setCheckIn(date);
    setCheckOut(new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000)); // Set checkout to next day
  };
  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFreeService = () => {
    hotelRequest()
    setShowModal(false);

  }

  const handlePayupi = () => {
    setShowModal(false)
    hotelRequest()
  }

  const hotelRequest = async () => {
    const data = {
      // order_type: selectedOrderType,
      category: selectedRoomTypeState,
      amount: selectedRoom.totalAmount,  // Send 
      check_in: checkIn.toISOString().split("T")[0], // Correct format YYYY-MM-DD
      check_out: checkOut.toISOString().split("T")[0], // Keep as string
      payment_status: status, // payment status for paid or pending
      payment_type: paytype, // payment type for online or offline
      room_count: selectedRoom.roomCount,
      // room_count:selectedRoom.roomCount,
      guest_count: selectedRoom.guestCount,
      status: booked,
      customer_id: user.user_id, // Replace with actual user ID from backend
      guest_name: user.username, // send username for this field
      // employee_id:[2]
    };


    try {
      const response = await axios.post(
        // "https://4fe1-59-97-51-97.ngrok-free.app/kovais/hotel/orders/",
        "https://api.capture360.ai/kovais/hotel/orders/",
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (response) {
        console.log("Booking Successful:", response.data);
        Swal.fire({ title: "Success", icon: "success" });
      }


    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire({ title: "Error", text: error, icon: "error" });
    }
  };

  const Available = async () => {
    try {
      const response = await axios.get(
        // "https://4fe1-59-97-51-97.ngrok-free.app/kovais/hotel/orders/",
        "https://api.capture360.ai/kovais/room-count/",
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      // console.log("Success:", response.data);
      console.log("Available Rooms:", response.data.available_room_count);
      // Swal.fire({ title: "Success", icon: "success" });

    } catch (error) {
      console.error("No Available Rooms:", error);
      // Swal.fire({ title: "Error", text: response.data.error, icon: "error" });
    }
  };

  return (
    <>
      {/* <ScrollToTop /> */}
      <Container fluid className="hotel-container">
        {/* Search Header */}
        <div className="search-results-header">
          <Row className="align-items-center justify-content-center g-3">
            {/* City, Property Name, or Location */}
            <Col md={3} xs={12}>
              <Form.Group controlId="locationInput">
                <Form.Label className="text-center" style={{ color: "black" }}>Location</Form.Label>
                <Form.Control
                  type="text"
                  className="custom-datepicker"
                  placeholder="Gobichettipalayam, Erode India"
                />
              </Form.Group>
            </Col>

            {/* Check-In Date */}
            <Col md={3} xs={12}>
              <Form.Group controlId="checkInDate">
                <Form.Label className="text-center" style={{ color: "black" }}>Check-In Date</Form.Label>
                <DatePicker
                  selected={checkIn}
                  onChange={handleCheckIntoChange}
                  minDate={new Date()}
                  className="form-control custom-datepicker"
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select Check-In Date"
                />
              </Form.Group>
            </Col>


            {/* Check-Out Date */}
            <Col md={3} xs={12}>
              <Form.Group controlId="checkOutDate">
                <Form.Label className="text-center" style={{ color: "black" }}>Check-Out Date</Form.Label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn}
                  className="form-control custom-datepicker"
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select Check-Out Date"
                />
              </Form.Group>
            </Col>

            {/* Room Type Dropdown */}
            <Col md={3} xs={12}>
              <Form.Group controlId="roomTypeSelect">
                <Form.Label className="text-align-center" style={{ color: "black" }}>Room Type</Form.Label>
                <Form.Control
                  as="select"
                  className="custom-select"
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                >
                  <option value="Delux Room">Delux Room</option>
                  {/* Add other room types as needed */}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Search Results Content */}
        <div className="search-results-content" style={{ padding: '20px' }}>
          <h2 data-aos="fade-up">Search Results</h2>
          <Row>
            {sortedRooms.map((room, index) => (
              <Col md={12} key={room.id}>
                <Card className="mb-4 shadow-sm" data-aos="fade-up">
                  <Row>
                    <Col md={4}>
                      {/* Room Image */}
                      <Card.Img variant="top" src={room.imgSrc} alt={room.title} className="img-fluid" style={{
                        width: "100%",
                        height: "300px", // Default height
                        objectFit: "cover",
                        "@media (max-width: 768px)": { height: "150px" } // Smaller height on mobile
                      }} />
                    </Col>
                    <Col md={8}>
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <div>
                          <Card.Title className="mb-3">{room.title}</Card.Title>
                          <Card.Text>{room.description}</Card.Text>

                          <div className="d-flex align-items-center justify-content-between">
                            <div xs={12} md={6}>
                              {/* Price, Original Price, and Taxes */}
                              <h4 className="text-primary d-inline-block mb-2">{room.price}</h4>
                              {/* <small className="text-muted d-inline-block ms-2">
                              <del>{room.originalPrice}</del> 
                              {room.taxes}
                            </small> */}
                            </div>

                            {/* <div xs={12} md={6}>
                             Rating and Location 
                            <span className="badge bg-success">{room.rating}</span>
                            <span className="text-muted ms-2">{room.location}</span>
                          </div> */}
                          </div>

                          <p className="text-muted mb-2" >Amenities: {room.amenities.join(', ')}</p>
                        </div>
                      </Card.Body>

                      <div className="d-flex justify-content-evenly mt-3">
                        <div md={4} className='center'>
                          {/* Room Count Control */}
                          <Button variant="outline-secondary" size='sm' onClick={() => decrementRoom(index)}>-</Button>
                          <span className="room-count mx-2">{roomCounts[index]}</span>
                          <Button variant="outline-secondary" size="sm" onClick={() => incrementRoom(index)}>+</Button>
                          <span className="d-block mt-1 text-center">Room Count</span> {/* Room Count Label */}
                        </div>

                        <div md={4} className='center'>
                          {/* Guest Count Control */}
                          <Button variant="outline-secondary" size="sm" onClick={() => decrementGuest(index)}>-</Button>
                          <span className="guest-count mx-2">{guestCounts[index]}</span>
                          <Button variant="outline-secondary" size="sm" onClick={() => incrementGuest(index)}>+</Button>
                          <span className="d-block mt-1 text-center">Guest Count</span> {/* Guest Count Label */}
                        </div>                       
                      </div>
                    </Col>
                  </Row>
                  {/* <div> */}
                  <div className="appendBottom20 paper" data-aos="fade-up">
                        <div>
                          <div className="paperHdr">
                            <div className="flexOne">
                              <h4 className="font18 latoBlack blackText">Special Request</h4>
                              <p>
                                <span className="font12 redText">
                                  Special requests are subject to each hotel's availability, may be chargeable &amp; can't be guaranteed.
                                </span>
                              </p>
                            </div>
                            <a className="paperHdrCta" href="#" onClick={(e) => { e.preventDefault(); toggleAccordion(); }}>
                              <span className={`accordBtn appendLeft10 ${isExpanded ? 'up' : 'down'}`}></span>
                            </a>
                          </div>

                          {isExpanded && (
                            <div className="spclReqs__cont">
                              <p className="font14 latoBold appendBottom12">Commonly Requested</p>
                              <ul className="spclReqs__list">
                                {requestOptions.map(({ id, label, showTime, showInput }) => (
                                  <li key={id}>
                                    <div className="splReqs__listItem">
                                      <span className="checkmarkOuter">
                                        <input
                                          type="checkbox"
                                          id={id}
                                          checked={!!selectedOptions[id]}
                                          onChange={() => handleCheckboxChange(id)}
                                        />
                                        <label htmlFor={id}>{label}</label>
                                      </span>
                                    </div>
                                    {showTime && selectedOptions[id] && (
                                      <div className="timeInputWrapper">
                                        <label htmlFor={`${id}_time`} className="font12">
                                          Select time:
                                        </label>
                                        <input
                                          type="time"
                                          id={`${id}_time`}
                                          className="timeInput"
                                        />
                                      </div>
                                    )}
                                    {/* Extra input if needed (e.g. for extra beds) */}
                                    {showInput && selectedOptions[id] && (
                                      <div className="timeInputWrapper">
                                        <label htmlFor={`${id}_count`} className="font12">
                                          Enter number of beds:
                                        </label>
                                        <input
                                          type="number"
                                          id={`${id}_count`}
                                          className="timeInput"
                                          min={1}
                                          placeholder="e.g.1 or 2"
                                        />
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>

                              <p className="font16 latoBold blackText appendBottom15 appendTop25">Any other request?</p>
                              <textarea
                                cols="30"
                                rows="2"
                                className="splReqs__txtArea"
                                placeholder="Enter your special request"
                              ></textarea>
                            </div>
                          )}
                        </div>
                        <div className='last gap-2 d-flex justify-content-end'>
                          <Button variant="primary" className="shift-left"
                            onClick={() => verify(room, index)}
                          >
                            Book Now
                          </Button>
                        </div>
                      {/* </div> */}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>


        {/* <h4></h4> */}
        <section className="card-container">
          {images.map((item, index) => (
            <div className="cart" key={index} data-aos="fade-up">
              <img src={item.img} alt={item.title} className="card-image" />
              <div className="card-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </section>



        {/* Modal Component */}
        <Modal show={showModal} onHide={handleCloseModal} centered data-aos="fade-up">
          <Modal.Header closeButton>
            <Modal.Title>Payment Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRoom && (
              <>
                <h4>{selectedRoom.title}</h4>
                <p>{selectedRoom.description}</p>
                <p><strong>Original Price:</strong><del>{selectedRoom.originalPrice}</del></p>
                <p><strong>Offer Price: </strong>{selectedRoom.price}</p>
                <p><strong>Taxes: </strong>{selectedRoom.taxes}</p>
                <p><strong>Room Count: </strong>{selectedRoom.roomCount}</p>
                <p><strong>Guest Count: </strong>{selectedRoom.guestCount}</p>
                <p><strong>Total Amount: </strong>₹{selectedRoom.totalAmount}</p> {/* Display the total amount here */}
              </>
            )}
            {/* <Row>
            <Col className="profile-field">
                <label>Aadhar Card Upload:</label>
                <input type="file" accept=".pdf,.jpg,.png" />
                <button className="save-button" >Save</button>
                {/* onChange={handleFileChange} onClick={handleSave} */}
            {/* </Col>
              <Col>
                <lable>Purpose of Visit</lable>
                <input type="text" />
            </Col>
          </Row>  */}
            {/* */}
            <Row className='mt-3'>
              <Col>
                <Button variant="primary" className="w-100" onClick={() => {
                  setStatus("pending")
                  setPaytype("offline")
                }}>
                  Book @ 0
                </Button>
              </Col>
              <Col>
                <Button variant="success" className="w-100" onClick={() => {
                  setStatus("paid")
                  setPaytype("online")
                }}>
                  Pay with UPI
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="d-flex justify-content-center align-items-center">
                <label htmlFor="points" className="me-2"><b>points:</b></label>
                <input
                  className=" w-100"
                  id="points"
                  type="number"
                  placeholder="Enter points"
                  calssName="inpu"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="success" className="w-100" onClick={usePoints}>
                  Use Points
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        {/* Login Modal */}
        {/* {!isLoggedIn && (
  <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={user?.username || ""}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={user?.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </Form.Group>

        {/* Display Error Message */}
        {/* {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </Form>
      
      <p className="mt-3">
        New user?{" "}
        <Button variant="link" onClick={() => setShowLoginModal(false)}>
          Sign Up
        </Button>
      </p>
    </Modal.Body>
    
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
        Close
      </Button>
      <Button variant="primary" onClick={loginUser} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Modal.Footer>
  </Modal> 
)} */}

        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isNewUser ? "Sign Up" : "Login"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Username Field */}
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={user?.username || ""}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Enter your username"
                />
              </Form.Group>

              {/* Email Field (Only for Signup) */}
              {isNewUser && (
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={user?.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </Form.Group>
              )}

              {/* Password Field */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={user?.password || ""}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Enter your password"
                />
              </Form.Group>

              {/* Error Message */}
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </Form>

            {/* Toggle Between Login & Signup */}
            <p className="mt-3">
              {isNewUser ? (
                <>
                  Already have an account?{" "}
                  <Button variant="link" onClick={() => setIsNewUser(false)}>
                    Login
                  </Button>
                </>
              ) : (
                <>
                  New user?{" "}
                  <Button variant="link" onClick={() => setIsNewUser(true)}>
                    Sign Up
                  </Button>
                </>
              )}
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={isNewUser ? signUp : loginUser}
              disabled={loading}
            >
              {loading ? (isNewUser ? "Signing up..." : "Logging in...") : isNewUser ? "Sign Up" : "Login"}
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
};

export default SearchResults;

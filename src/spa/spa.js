import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card, Modal, Form, Carousel } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './spa.css'
// import slide1 from './images/s7.jpg'
import Aroma from './images/Aromatherapy.jpg'
import Swedish from './images/SwedishMassage.jpg'
import Thai from './images/Thaimassage.jpg'
import ThaiM from './images/ThaiM.jpg'
import SwedishW from './images/swedishW.jpg'
import AromaW from './images/AromaW.jpg'
import menfrent from './images/menfrent.jpg'
import womenfrent from './images/womenfrent.jpg'
import spaAd from './images/spaad.jpg'
import Swal from 'sweetalert2'
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";

const TheBoyzPage = ({ user, setUser }) => {

  const [selectedGender, setSelectedGender] = useState('Men')
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [paytype, setPaytype] = useState("")
  const [status, setStatus] = useState("")
  const [amount, setAmount] = useState(0)
  // const [userId, setUserId] = useState()
  // const [username, setUsername] = useState('')
  const [booked, setBooked] = useState("booked")
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [point, setPoint] = useState()
  const [value, setValue] = useState()

  const services = {
    Men: [
      {
        id: 1,
        name: 'Swedish Massage',
        description: ' It is often used to relax you, relieve stress and relieve pain. Swedish massage often involves rubbing, kneading, stroking and tapping your muscles',
        amount: 300,
        imageUrl: Swedish,
      },
      {
        id: 2,
        name: 'Aromatherapy Massage',
        description: 'Aromatherapy is a specific type of therapy that incorporates scented essential oils into a massage. The massage involves alternating between gentle and harder pressure while using a particular blend of essential oils. The essential oils are diluted before use and are applied along with lotion during the massage.',
        amount: 300,
        imageUrl: Aroma,
      },
      {
        id: 3,
        name: 'Thai Massage',
        description: 'Traditional Thai massage combines acupressure, Indian Ayurvedic principles, and assisted yoga postures, but with no use of oils or lotions. The recipient remains clothed during treatment.',
        amount: 300,
        imageUrl: ThaiM,
      },
    ],
    Women: [
      {
        id: 1,
        name: 'Swedish Massage',
        amount: 300,
        description: ' It is often used to relax you, relieve stress and relieve pain. Swedish massage often involves rubbing, kneading, stroking and tapping your muscles',
        imageUrl: SwedishW,
      },
      {
        id: 2,
        name: 'Aromatherapy Massage',
        description: 'Aromatherapy is a specific type of therapy that incorporates scented essential oils into a massage. The massage involves alternating between gentle and harder pressure while using a particular blend of essential oils. The essential oils are diluted before use and are applied along with lotion during the massage.',
        amount: 300,
        imageUrl: AromaW,
      },
      {
        id: 3,
        name: 'Thai Massage',
        description: 'Traditional Thai massage combines acupressure, Indian Ayurvedic principles, and assisted yoga postures, but with no use of oils or lotions. The recipient remains clothed during treatment.',
        amount: 300,
        imageUrl: Thai,
      },
    ],

  }

  useEffect(() => {
    if (
      !selectedService ||
      !services[selectedGender].some(
        (service) => service.id === selectedService.id
      )
    ) {
      setSelectedService(services[selectedGender][0])
    }


    AOS.init({ duration: 1500 })
  }, [selectedGender, services])

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
  ]

  const isSlotBooked = (slot) => bookedSlots.includes(slot);

  const handleSelectService = (service) => {
    setSelectedService(service)
  }

  const handleSelectSlot = (slot) => {
    // if (!bookedSlots.includes(slot)) {
    setSelectedTime(slot);
    // setBookedSlots([...bookedSlots, slot]); // Mark slot as booked
    // }
  };

  const signUp = async () => {
    try {
      const formattedData = {
        name: user.username,
        email: user.email,
        password: user.password,
      };

      const response = await axios.post(
        // "https://1c9e-2409-408d-618-658e-15f8-262a-6616-c57e.ngrok-free.app/kovais/create-customer/",
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
        // "https://1c9e-2409-408d-618-658e-15f8-262a-6616-c57e.ngrok-free.app/kovais/customer-login/",
        {
          username: user.username,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
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

    useEffect(() => {
      // Load points from localStorage on component mount
      const storedPoints = JSON.parse(localStorage.getItem("signedUpUser"));
      // const points = storedPoints.point
      setPoint(storedPoints);
    }, []);
  
    const usePoints = () => {
      // Convert input value to number
      let pointsToUse = parseInt(value);
    
      // Check if input is a valid number
      if (isNaN(pointsToUse) || pointsToUse <= 0) {
        alert("Please enter a valid number of points greater than 0.");
        return;
      }
    
      // Check if current point balance is valid
      if (point == null || isNaN(point)) {
        alert("Point balance is not available. Please try again later.");
        return;
      }
    
      // Check if user has enough points
      if (pointsToUse > point) {
        alert(`You only have ${point} points. Please enter a valid amount.`);
        return;
      }
    
      // Deduct points and update
      const newBalance = point - pointsToUse;
      setPoint(newBalance);
    
      // Save updated points back to localStorage
      const currentUser = JSON.parse(localStorage.getItem("singedUpUser"));
      if (currentUser) {
        currentUser = newBalance;
        localStorage.setItem("singedUpUser", JSON.stringify(currentUser));
      }
      alert(`You used ${pointsToUse} points. Remaining balance: ${newBalance} points.`);
      setValue(""); // Reset input field
    };
        

  const handlePayment = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser && selectedService && selectedTime) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      setShowLoginModal(false);
      setShowModal(true); // ✅ Show payment modal
    } else {
      console.log("No user is logged in. Showing login modal.");
      setShowLoginModal(true);
    }
  }

  // const handleCloseModal = () => {
  //   setShowModal(false)
  //   setSelectedService(null)
  //   setSelectedTime(null)
  // }

  const handleScroll = () => {
    const section = document.getElementById("target-section");
    section.scrollIntoView({ behavior: "smooth" });
  }

  const handleScrollDown = () => {
    const section = document.getElementById("target-sec");
    section.scrollIntoView({ behavior: "smooth" });
  }

  const handleDown = () => {
    const section = document.getElementById("section");
    section.scrollIntoView({ behavior: "smooth" });
  }

  // Function to hide the modal

  const handleClicked = () => {
    setShowModal(false);

  }

  const handleFreeService = () => {
    spaRequest()
    setShowModal(false)
  }
  const handlePayupi = () => {

    setShowModal(false)
    spaRequest()

  }

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

  // Function to handle button click
  const spaRequest = async () => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Converts to YYYY-MM-DD format

    const data = {
      // order_type: selectedOrderType,
      category: selectedGender,
      amount: selectedService?.amount,
      services: selectedService?.name,  // Send service name instead of object
      date: formattedDate, // Correct format YYYY-MM-DD
      time: selectedTime, // Keep as string
      payment_status: status, // payment status for paid or pending
      payment_type: paytype, // payment type for online or offline
      customer_id: user.user_id, // Replace with actual user ID from backend
      status: booked,
      customer_name: user.username
    };

    try {
      const response = await axios.post(
        // "https://1c9e-2409-408d-618-658e-15f8-262a-6616-c57e.ngrok-free.app/kovais/spa/orders/",
        "https://api.capture360.ai/kovais/spa/orders/",
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log("Success:", response.data);
      localStorage.setItem("spaId", JSON.stringify(response.data.id));

      Swal.fire({
        title: "success",
        icon: "success",
        draggable: false
      });
      // setTimeout(()=>{
      //   alert("Order Placed:" , response.data.username)
      //    navigate("/")
      // },1500)

    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };


  return (
    <Container fluid className="spa-container">
      <div className="the-boyz-page">
        {/* Carousel Section */}
        <Carousel className="carousel-section" interval={2000} pause={false} controls={true} indicators={true}>

          <Carousel.Item>
            <img
              className="carousel-img"
              src="https://t4.ftcdn.net/jpg/05/84/54/21/360_F_584542180_g0z0wDaZk7jTA8W5wtBgMJd9tOaP2uCD.jpg"
              alt="Second slide"
              style={{ height: 380 }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-img"
              src="https://t4.ftcdn.net/jpg/05/26/31/19/360_F_526311939_DVS9EEQxMkg5NBmMG3tVbLHtUz9pYOuj.jpg"
              alt="Third slide"
              style={{ height: 380 }}
            />
          </Carousel.Item>
        </Carousel>

        {/* Service Type Selection */}
        <section className="my-4">
          {/* Gender Selection */}
          <h2 data-aos="fade-up" style={{ color: "#098966", textAlign: "center" }}>
            Gender Selection
          </h2>
          <Row className="text-center my-3 justify-content-center">
            {/* Gender Selection Cards */}
            {[
              { gender: "Men", image: menfrent },
              { gender: "Women", image: womenfrent }
            ].map(({ gender, image }, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Card
                  data-aos="fade-up"
                  onClick={() => {
                    setSelectedGender(gender);
                    handleScroll();
                  }}
                  className="text-center service-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Ensure content is centered
                    borderRadius: "15px",
                    overflow: "hidden", // Ensures button stays within border
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={gender}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body
                    style={{
                      padding: "10px",
                      width: "100%",
                      marginTop: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: setSelectedGender === gender ? "gray" : "transparent",
                        color: setSelectedGender === gender ? "#fff" : "#000",
                        padding: "10px",
                        fontSize: "18px",
                        width: "100%",
                        maxWidth: "200px",
                        height: "50px",
                        borderRadius: "0 0 15px 15px",
                        border: "none", // ✅ Removed border
                        boxShadow: "none",
                        transition: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {gender}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Service Selection */}
        <section className="my-4 py-4 px-4" id="target-section">
          <h3 className="text-center" data-aos="fade-up">Services for {selectedGender}</h3>
          <Row>
            {services[selectedGender].map((service) => (
              <Col md={4} key={service.id}>
                <Card
                  data-aos="fade-up"
                  className={`service ${selectedService?.id === service.id ? 'selected' : ''
                    }`}
                  onClick={() => {
                    handleSelectService(service)
                    handleScrollDown()
                  }}
                >
                  <div className="image-container">
                    <Card.Img variant="top" src={service.imageUrl} className="card-image" />
                    <div className="popup">
                      <p>{service.description}</p>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section id="target-sec" className="my-4">
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center cal"
            >
              <DatePicker
                data-aos="fade-up"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                inline
                minDate={new Date()} // Restrict past dates
              />
            </Col>

            <Col md={6}>
              <h4 className="text-center mb-4">Available Time Slots</h4>
              <Row className="text-center">
                {timeSlots.map((slot) => (
                  <Col key={slot} md={4} className="my-2">
                    <Button
                      data-aos="fade-up"
                      style={{
                        backgroundColor: isSlotBooked(slot)
                          ? 'gray'
                          : selectedTime === slot
                            ? 'gray'
                            : 'transparent',
                        color: selectedTime === slot ? '#fff' : '#000',
                        borderColor: selectedTime === slot ? 'gray' : 'black',
                        width: '100%',
                        transition:
                          'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                      }}
                      onClick={() => {
                        handleSelectSlot(slot);
                        handleDown();
                      }}
                      disabled={isSlotBooked(slot)}
                    >
                      {slot}
                    </Button>
                  </Col>
                ))}
              </Row>

              <div className="d-flex justify-content-end mt-5" id="section" data-aos="fade-up"
              >
                <Button
                  variant="success"
                  onClick={handlePayment}
                  disabled={!selectedTime}
                  className="bottom-0 end-0 m-4"
                >
                  Proceed to Payment
                </Button>
              </div>
            </Col>
          </Row>
        </section>

        {/* Modal Popup for Payment Options */}
        <Modal show={showModal} onHide={handleClicked} centered data-aos="fade-up"
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={spaAd} // Example banner image
              alt="Banner"
              className="img-fluid mb-3"
            />
            <p><strong>Price:</strong>{selectedService?.amount}</p>
            <p><strong>Massage:</strong>{selectedService?.name}</p>
            <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
            <p><strong>Time:</strong>{selectedTime}</p>


            <Row>
              <Col>
                <Button variant="primary" className="w-100" onClick={() => {
                  setStatus("pending");
                  setPaytype("offline")
                }}>
                  Book @0
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
                  className="cus-input w-100"
                  id="points"
                  type="number"
                  placeholder="Enter points"
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
      </div>
    </Container>
  )
}

export default TheBoyzPage

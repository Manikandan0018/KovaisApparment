import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Container, Row, Form, Col, Modal } from 'react-bootstrap';
import './gym.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import moment from 'react-moment';
import AOS from "aos";
import "aos/dist/aos.css";
import Gymjpg from "./Img/Gym.jpg"

const Gym = ({ user, setUser }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedTime, setSelectedTime] = useState("")
  const [bookedSlots, setBookedSlots] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false); // Modal state
  const [bookedStatus, setBookedStatus] = useState("booked")
  const [paytype, setPaytype] = useState("")
  const [point, setPoint] = useState()
  const [value, setValue] = useState()
  // const [category, setCategory] = useState('')
  const [plan, setPlan] = useState("")
  const [status, setStatus] = useState("")
  // const [userId, setUserId] = useState()
  // const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);


  const purchaseddate = [
    { amount: '499', duration: '1 Month' },
    { amount: '1500', duration: '3 Months' },
    { amount: '3000', duration: '6 Months' },
    { amount: '5000', duration: '1 Year' }
  ]

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  // const handleCardClick = (newCategory) => {
  //   setCategory(newCategory);
  //    alert(`${newCategory} card was clicked!`);
  // };

  const handlePlanClick = (amount, duration) => {
    setSelectedAmount(amount);
    setPlan(duration);
    //  alert(`${duration} plan selected!`);
  };


  const isProceedEnabled = selectedGender && selectedAge && selectedAmount && selectedTime && plan;

  const timeSlots = [
    '05:00 AM',
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
  ]

  const isSlotBooked = (slot) => {
    const dateKey = selectedDate
    return bookedSlots[dateKey]?.includes(slot)
  }

  const handleSelectSlot = (slot) => {
    setSelectedTime(slot)
  }
  // Modal handlers
  const handleShowModal = () => {
    setShowModal(true)
  };
  const handleCloseModal = () => setShowModal(false);

  const handleScroll = () => {
    const Row = document.getElementById("target-section");
    Row.scrollIntoView({ behavior: "smooth" });
  }

  const handlePayment = () => {
    // For other categories, both service and time slot are required
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser && selectedTime) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      setShowLoginModal(false);
      setShowModal(true); // ✅ Show payment modal
    } else {
      console.log("No user is logged in. Showing login modal.");
      setShowLoginModal(true);
    }
  }

    useEffect(() => {
      // Load points from localStorage on component mount
      const storedPoints = JSON.parse(localStorage.getItem("signedUpUser"));
      // const points = storedPoints.point
      setPoint(storedPoints);
    }, []);
  
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
  

    const handlePayupi = () => {

      handleCloseModal();
      gymRequest()
  
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


  // const handleScrollDown = () => {
  //   const section = document.getElementById("target-Sec");
  //   section.scrollIntoView({ behavior: "smooth" });
  // }

  // const handleDown = () => {
  //   const section = document.getElementById("target-down");
  //   section.scrollIntoView({ behavior: "smooth" });
  // }

  const loginUser = async () => {
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


  const handleDates = () => {
    const section = document.getElementById("dates");
    section.scrollIntoView({ behavior: "smooth" });
  }
  // const handleCategory= () => {
  //   const section = document.getElementById("category");
  //   section.scrollIntoView({ behavior: "smooth" });
  // }
  const handlePlan = () => {
    const section = document.getElementById("plan");
    section.scrollIntoView({ behavior: "smooth" });
  }


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

  const handleClicked = () => {
    setShowModal(false);

  }

  const handleFreeService = () => {
    handleCloseModal();
    gymRequest()

  }
  // const handleStatusUpdate = () => {
  //   const newStatus = status === "Active" ? "Inactive" : "Active";
  //   setStatus(newStatus); // Update state
  // };

  const handlePayService = () => {
    handleCloseModal();
    // handleStatusUpdate()
    gymRequest()

  }

  const gymRequest = async () => {
    // Ensure state values are up to date
    if (!selectedGender || !selectedAge || !selectedAmount || !bookedSlots || !purchaseddate) {
      console.error("Please select all fields before proceeding.");
      return;
    }

    // const calculateExpiryDate = (selectedDate, plan) => {
    //   let expiry = moment(selectedDate, 'DD-MM-YYYY'); // Convert joining date to a moment object

    //   switch (plan) {
    //     case 'Month': // 28-day plan
    //       expiry = expiry.add(28, 'days'); // Adds 28 days
    //       break;
    //     case 'Half-Yearly':
    //       expiry = expiry.add(6, 'months'); // Adds 6 months
    //       break;
    //     case 'Yearly':
    //       expiry = expiry.add(1, 'years'); // Adds 1 year
    //       break;
    //     default:
    //       return '';
    //   }

    //   return expiry.format('DD-MM-YYYY'); // Return expiry date in DD-MM-YYYY format
    // };

    const data = {
      gender: selectedGender,
      age: selectedAge,
      amount: selectedAmount,
      plan: plan,
      payment_status: status, // payment status for paid or pending
      payment_type: paytype, // payment type for online or offline
      timeslot: selectedTime,
      //  category:category, 
      purchaseddate: selectedDate,
      status: bookedStatus,
      customer_id: user.user_id,
      username: user.username
      // expiry_date:calculateExpiryDate
    };

    try {
      const response = await axios.post(
        // "https://1c9e-2409-408d-618-658e-15f8-262a-6616-c57e.ngrok-free.app/kovais/gym/orders/",
        "https://api.capture360.ai/kovais/gym/orders/",
        data,  //  Send object, not array 
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log("Success:", response.data);
      localStorage.setItem("gymId", JSON.stringify(response.data.id));

      Swal.fire({
        title: "success",
        icon: "success",
        draggable: false
      });

    } catch (error) {
      console.error("Axios Error:", error.response ? error.response.data : error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };


  return (
    <div className="gym-container">
      {/* Carousel Section */}
      <Carousel className="carousel-section" interval={2000} pause={false} controls={true} indicators={true}>
        <Carousel.Item>
          <img className="carousel-img" src="https://slamfitnessstudio.in/wp-content/uploads/2023/04/slam-ban1.webp" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-img" src="https://i0.wp.com/goldsgym.in/wp-content/uploads/2023/11/Online-personal-training-1920x591-1.jpg?fit=1920%2C591&ssl=1" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-img" src="https://img.freepik.com/free-vector/fitness-gym-training-twitch-banner_23-2150681508.jpg?t=st=1728389866~exp=1728393466~hmac=1589fcbf8ad4efca30fad422cb03bfa1260f025a52d4c454b5b8a69ac74e0b4b&w=1380" alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      {/* Select Gender Section */}
      <h2 className='text-center' data-aos="fade-up">Select Gender</h2>
      <Container>
        <Row className="gender-selection justify-content-center">
          <Col md={3}>
            <Card
              data-aos="fade-up"
              className={`selection-card ${selectedGender === 'Men' ? 'selected' : ''}`}
              onClick={() => {
                setSelectedGender('Men')
                handleScroll()
              }}
            >
              <Card.Img variant="top" src="https://img.freepik.com/premium-photo/powerful-stylish-body-builder-with-dumbbells-look-camera-isolated-dark-background_1024356-7298.jpg?ga=GA1.1.1857534666.1690658127&semt=ais_hybrid" />
              <Card.Body>
                <Card.Title>Men</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              data-aos="fade-up"
              className={`selection-card ${selectedGender === 'Women' ? 'selected' : ''}`}
              onClick={() => {
                setSelectedGender('Women')
                handleScroll()
              }}
            >
              <Card.Img variant="top" src="https://img.freepik.com/premium-photo/girl-red-shirt-stands-front-window-with-sun-shining-through-window_427757-32950.jpg?ga=GA1.1.1857534666.1690658127&semt=ais_hybrid" />
              <Card.Body>
                <Card.Title>Women</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Select Age Section */}
      <h2 className='text-center' id="target-section" data-aos="fade-up">Select Age</h2>
      <Container>
        <Row className="age-selection justify-content-center">
          <Col md={3}>
            <Card
              data-aos="fade-up"
              className={`selection-card ${selectedAge === 'Under 18' ? 'selected' : ''}`}
              onClick={() => {
                setSelectedAge('Under 18')
                handleDates()
              }}
            >
              <Card.Img variant="top" src="https://img.freepik.com/free-photo/children-sport_23-2148108576.jpg?ga=GA1.1.1857534666.1690658127&semt=ais_hybrid" />
              <Card.Body>
                <Card.Title>Under 18</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              data-aos="fade-up"
              className={`selection-card ${selectedAge === 'Under 30' ? 'selected' : ''}`}
              onClick={() => {
                setSelectedAge('Above 20')
                handleDates()
              }}
            >
              <Card.Img variant="top" src="https://img.freepik.com/free-photo/medium-shot-people-training-with-kettlebells_23-2149307721.jpg?ga=GA1.1.1857534666.1690658127&semt=ais_hybrid" />
              <Card.Body>
                <Card.Title>Above 20</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              data-aos="fade-up"
              className={`selection-card ${selectedAge === 'Above 35' ? 'selected' : ''}`}
              onClick={() => {
                setSelectedAge('Above 30')
                handleDates()
              }}
            >
              <Card.Img variant="top" src="https://img.freepik.com/free-photo/group-happy-people-standing-against-wall-gym_23-2147949689.jpg?ga=GA1.1.1857534666.1690658127&semt=ais_hybrid" />
              <Card.Body>
                <Card.Title>Above 30</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container id="dates" className="my-4">
        <Row>
          <Col
            md={6} xs={12}
            className="d-flex justify-content-center align-items-center"
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

          <Col md={6} xs={12}>
            <h4 className="text-center mb-4 mt-5" data-aos="fade-up">Available Time Slots</h4>
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
                      handleSelectSlot(slot)
                      // handleCategory()
                      handlePlan()
                    }}
                    disabled={isSlotBooked(slot)}
                  >
                    {slot}
                  </Button>
                </Col>
              ))}
            </Row>

          </Col>
        </Row>
      </Container>

      <div className="gym-container">
        {/* <h2 className='text-center' id="category">Category</h2>
      <br/>
      <Container>
        <Row className="justify-content-center text-center">
          {['Fitness', 'Weight Loss', 'Weight Gain', 'Body Building'].map((item) => (
            <Col md={6} lg={3} key={item}>
              <Card
                className={`selection-card ${category === item ? 'selected' : ''}`}
                onClick={() => handleCardClick(item)}
              >
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> */}

        <h2 className='text-center' id="plan">Select Price</h2>
        <Container>
          <Row className="justify-content-center text-center" data-aos="fade-up">
            {/* {purchaseddate && Array.isArray(purchaseddate) ? ( */}
            {purchaseddate.map(({ amount, duration }) => (
              <Col md={6} lg={3} key={`${amount}-${duration}`}>
                <Card
                  className={`selection-card ${selectedAmount === amount ? 'selected' : ''}`}
                  onClick={() => handlePlanClick(amount, duration)}
                >
                  <Card.Body>
                    <Card.Title>{duration || "No Duration"}</Card.Title>
                    <Card.Text>
                      Rs: {amount ? `${amount}/-` : "Price Unavailable"} <br />
                      Using Unlimited Equipments
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              // )))}
            ))}
          </Row>
        </Container>

      </div>

      {/* Proceed Payment Button */}
      <div className="text-center" id="target-down" data-aos="fade-up">
        <Button variant="success" disabled={!isProceedEnabled} onClick={() => {
          handlePayment()
        }}>
          Proceed to Join
        </Button>
      </div>

      {/* Payment Options Modal */}
      <Modal show={showModal} onHide={handleClicked} centered data-aos="fade-top">
        <Modal.Header closeButton>
          <Modal.Title>Payment Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={Gymjpg} // Example banner image
            alt="Banner"
            className="img-fluid mb-3"
          />
          <p><strong>Price:</strong>{selectedAmount}</p>
          <p><strong>Duration:</strong>{plan}</p>
          <p><strong>Joining Date:</strong> {selectedDate.toLocaleDateString()}</p>
          <Row>
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
                className="w-100 in"
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
          {/* <div className="mt-4 text-center">
            <Button
              variant="secondary"
              className="w-100"
              onClick={() => {
                // alert('Booking confirmed! You will pay after the service.');
                handleClicked();
              }}
            >
              Pay After Service
            </Button>
          </div> */}
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
  );
};

export default Gym;

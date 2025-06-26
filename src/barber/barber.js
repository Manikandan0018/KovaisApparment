import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card, Modal, Form, Carousel } from 'react-bootstrap'
import { Link } from "react-router-dom"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './barber.css'
import slide1 from './images/s7.jpg'
import men1 from './images/men1.jpeg'
import men2 from './images/men2.jpeg'
import men3 from './images/men3.jpg'
import Swal from 'sweetalert2'
import funerR from './images/funerR.jpg'
import axios from 'axios'
import backs from './images/backs-funer.jpg'
import funerS from './images/funerS.jpg'
import Function from './images/special.jpg'
import fadeCut from "./images/fadeCut.jpg";
import classicCut from "./images/classicCut.jpg";
import buzzCut from "./images/buzzcut.jpg";
import color from "./images/isg.jpg"
import Facial from "./images/isg f.jpg"
import hairct from "./images/isg h.jpg"
import hair3 from "./images/hair3.webp"
import hair2 from "./images/hair2.jpg"
import hair1 from "./images/hair1.jpg"
import colorg1 from "./images/colorg1.webp"
import colorg2 from "./images/colorg2.webp"
import colorg3 from "./images/colorg3.jpg"
import facial5 from "./images/facial5.jpg"
import facial7 from "./images/facial7.jpg"
import facial10 from "./images/facial10.jpg"
import saving1 from "./images/shave1.jpg"
import saving2 from "./images/shave2.jpg"
import saving3 from "./images/shave3.jpg"
import color1 from "./images/Mhc.jpg"
import color4 from "./images/colorm4.jpg"
import color5 from "./images/colorm5.jpg"
import kids1 from "./images/ck1.jpg"
import kids2 from "./images/ck2.jpg"
import kids3 from "./images/ck3.jpg"
import fb1 from "./images/fb1.jpg"
import fb2 from "./images/fb2.jpg"
import fb3 from "./images/fb3.jpg"
import fsb3 from "./images/fsb3.jpg"
import fsb2 from "./images/fsb2.jpg"
import fsb1 from "./images/fsb1.jpg"
import funcut3 from "./images/funcut3.jpg"
import fun1 from "./images/funcut1.jpg"
import fun2 from "./images/funcut2.jpg"
import AOS from "aos";
import "aos/dist/aos.css";


const TheBoyzPage = ({ user, setUser }) => {
  const [selectedOrderType, setSelectedOrderType] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [status, setStatus] = useState("")
  const [bookedStatus, setBookedStatus] = useState("booked")
  const [paytype, setPaytype] = useState("")
  const [bookedSlots, setBookedSlots] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [point, setPoint] = useState({})
  // const [userId, setUserId] = useState()
  // const [username, setUsername] = useState()
  const [serviceFor, setServiceFor] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState()


  const services = {
    Men: [
      {
        id: 1,
        name: 'Haircut',
        amount: 100,
        imageUrl: men1,
        descriptionUrl: classicCut,
        detailsUrl: fadeCut,
        benifitUrl: buzzCut,
        description: `1. The Classic Cut
            ➡ A timeless, clean look with neatly trimmed sides and longer hair on top.
            ✅ Best For: All face shapes.
            💡 Tip: Use a pomade or wax for a sleek finish`,
        details: `2. The Fade Cut
                    ➡ A modern, stylish fade that blends the hair seamlessly from short to long.
                    ✅ Best For: Round, oval, and square faces.
                    💡 Tip: Regular touch-ups keep the fade looking sharp.`,
        benifit: ` 3. The Buzz Cut
            ➡ A short, low-maintenance haircut with evenly trimmed hair all over.
            ✅ Best For: Oval and square faces.
            💡 Tip: Apply moisturizer to keep your scalp healthy.`,
      },
      {
        id: 2,
        name: 'Shave',
        amount: 50,
        imageUrl: men2,
        descriptionUrl: saving1,
        detailsUrl: saving2,
        benifitUrl: saving3,
        description: `1. Faded Beard Trim
        A gradual fade from the sideburns to the beard.
        Gives a sharp and modern appearance.
        Works well with short or medium-length hair.
        Requires regular upkeep for a clean look.`,
        details: `2. Defined Goatee Trim
         A neatly shaped goatee with sharp edges.
         Enhances the chin and adds a stylish touch.
        Suitable for both casual and formal looks.
        Needs precision trimming to maintain shape..`,
        benifit: ` 3. Beardstache Trim
A thick mustache paired with light stubble.
Offers a bold and masculine aesthetic.
Perfect for those who want a unique style.
Requires balancing the mustache and beard length.`,
      },
      {
        id: 3,
        name: 'Hair Coloring',
        amount: 150,
        imageUrl: men3,
        descriptionUrl: color1,
        detailsUrl: color4,
        benifitUrl: color5,
        description: `1️⃣ Men’s Hair Coloring – Basics
1 Choosing the Right Shade – Selecting a color that complements skin tone and natural hair color.
2 Types of Hair Color – Permanent, semi-permanent, highlights, or grey coverage.
3 Application Methods – Full coverage, streaks, or trendy styles like underlights or fade blends.`,
        details: `2️⃣ Men’s Hair Coloring – Maintenance & Care
1 Color Longevity – Using sulfate-free shampoos and avoiding excessive sun exposure.
2 Touch-ups & Fading – Regular touch-ups for grey coverage and color-refreshing products.
3 Hair Health After Coloring – Moisturizing treatments and protein-based conditioners to prevent dryness.`,
        benifit: `3️⃣ Men’s Hair Care & Styling
1 Haircut & Face Shape Matching – Choosing the right hairstyle for face shape (round, oval, square).
2 Daily Hair Care Routine – Proper washing, using hair serum, and avoiding excessive heat styling.
3 Styling Products & Techniques – Choosing between gels, waxes, pomades, or sprays for a perfect look`,
      },
    ],
    Women: [
      {
        id: 1,
        name: 'Haircut',
        amount: 400,
        imageUrl: hairct,
        descriptionUrl: hair3,
        detailsUrl: hair2,
        benifitUrl: hair1,
        description: `1. The Classic Cut
              ➡ A timeless, clean look with neatly trimmed sides and longer hair on top.
              ✅ Best For: All face shapes.
              💡 Tip: Use a pomade or wax for a sleek finish`,
        details: `2. The Fade Cut
                      ➡ A modern, stylish fade that blends the hair seamlessly from short to long.
                      ✅ Best For: Round, oval, and square faces.
                      💡 Tip: Regular touch-ups keep the fade looking sharp.`,
        benifit: ` 3. The Buzz Cut
              ➡ A short, low-maintenance haircut with evenly trimmed hair all over.
              ✅ Best For: Oval and square faces.
              💡 Tip: Apply moisturizer to keep your scalp healthy.`,
      },
      {
        id: 2,
        name: 'facial',
        amount: 300,
        imageUrl: Facial,
        descriptionUrl: facial5,
        detailsUrl: facial7,
        benifitUrl: facial10,
        description: `1. The Classic Cut
              ➡ A timeless, clean look with neatly trimmed sides and longer hair on top.
              ✅ Best For: All face shapes.
              💡 Tip: Use a pomade or wax for a sleek finish`,
        details: `2. The Fade Cut
                      ➡ A modern, stylish fade that blends the hair seamlessly from short to long.
                      ✅ Best For: Round, oval, and square faces.
                      💡 Tip: Regular touch-ups keep the fade looking sharp.`,
        benifit: ` 3. The Buzz Cut
              ➡ A short, low-maintenance haircut with evenly trimmed hair all over.
              ✅ Best For: Oval and square faces.
              💡 Tip: Apply moisturizer to keep your scalp healthy.`,
      },
      {
        id: 3,
        name: 'hair color',
        amount: 200,
        imageUrl: color,
        descriptionUrl: colorg1,
        detailsUrl: colorg2,
        benifitUrl: colorg3,
        description: `1. The Classic Cut
              ➡ A timeless, clean look with neatly trimmed sides and longer hair on top.
              ✅ Best For: All face shapes.
              💡 Tip: Use a pomade or wax for a sleek finish`,
        details: `2. The Fade Cut
                      ➡ A modern, stylish fade that blends the hair seamlessly from short to long.
                      ✅ Best For: Round, oval, and square faces.
                      💡 Tip: Regular touch-ups keep the fade looking sharp.`,
        benifit: ` 3. The Buzz Cut
              ➡ A short, low-maintenance haircut with evenly trimmed hair all over.
              ✅ Best For: Oval and square faces.
              💡 Tip: Apply moisturizer to keep your scalp healthy.`,
      },

    ],
    Kids: [
      {
        id: 1,
        name: 'Kids Haircut',
        amount: 8,
        imageUrl:
          'https://media.istockphoto.com/id/1407090464/photo/cute-little-boy-at-the-barber-shop-getting-his-hairut.jpg?s=612x612&w=0&k=20&c=I5Oh0kyjfERCAN2sNbAdjtAFgx5prm6unWWrQ8xokko=',
        descriptionUrl: kids1,
        detailsUrl: kids2,
        benifitUrl: kids3,
        description: `1. Classic Crew Cut
Short and neat, perfect for active kids.

Low maintenance with minimal styling needed.

Suitable for all face shapes and hair types.

Keeps kids cool in hot weather.`,
        details: `2. Trendy Undercut
Short on the sides, longer on top for a stylish look.

Can be styled in various ways (spiky, combed, or messy).

Requires occasional trims to maintain the shape.

Popular among older kids and pre-teens.

`,
        benifit: `3. Cute Bowl Cut
Even-length cut around the head, giving a rounded look.

Easy to manage with minimal brushing needed.

Works best for straight or slightly wavy hair.

Gives a playful and adorable appearance.`,
      },
    ],
    Funeral: [
      {
        id: 1,
        name: 'Funeral(saving & Bald)',
        amount: 500,
        imageUrl: funerS,
        descriptionUrl: fsb3,
        detailsUrl: fsb2,
        benifitUrl: fsb1,
        description: `1. Traditional Bald Shave
Hair is completely shaved off with a razor.

Done for religious, cultural, or funeral rituals.

Requires shaving cream to avoid irritation.

Regular moisturizing helps maintain smoothness.`,
        details: `2. Clipper Shave (Zero Guard)
Hair is shaved down to the skin using clippers.

Leaves a slight shadow but appears mostly bald.

Faster and safer than a razor shave for kids.

Requires occasional trims to keep the look.`,
        benifit: `3. Smooth Razor Head Shave
Achieved using a straight or safety razor.

Provides a completely clean and polished look.

Needs aftercare with lotion or oil to prevent dryness.

Best for formal ceremonies or spiritual practices.`,
      },
      {
        id: 2,
        name: 'Funeral(Bald)',
        amount: 300,
        imageUrl: backs,
        descriptionUrl: fb1,
        detailsUrl: fb2,
        benifitUrl: fb3,
        description: `1. Full Bald Cut
Completely shaved head for a clean and respectful look.

Requires regular shaving to maintain smoothness.

Suitable for all hair types and easy to manage.

Often chosen for traditional or religious ceremonies.

`,
        details: `2. Buzz Cut (Zero Blade)
Extremely short, close to bald but with a slight shadow.

Low maintenance with no need for combing or styling.

Can be done quickly with clippers at home or a salon.

Ideal for hot weather and easy hygiene.

`,
        benifit: `3. Smooth Razor Shave
Achieved with a razor for an ultra-smooth finish.

Requires shaving cream or gel to prevent irritation.

Best for a completely polished and uniform look.

Needs care to avoid razor bumps and dryness.`,
      },

    ],
    Functions: [
      {
        id: 1,
        name: 'Function',
        amount: 300,
        imageUrl: Function,
        descriptionUrl: funcut3,
        detailsUrl: fun1,
        benifitUrl: fun2,
        description: `1. Classic Crew Cut
Short and professional, perfect for everyday wear.

Low maintenance with minimal styling needed.

Works well for all hair types and face shapes.

Ideal for work, school, or formal occasions.`,
        details: `2. Taper Fade
Gradual fade from short to even shorter hair.

Clean and stylish, suitable for all functions.

Requires occasional trims to maintain the look.

Can be paired with a beard for a modern touch.`,
        benifit: ` 3. Layered Shoulder-Length Cut
Adds volume and movement to the hair.

Frames the face beautifully while maintaining elegance.

Versatile for both professional and social settings.

Can be styled straight, wavy, or with soft curls.`,
      },
    ]
  }

  const categoryImages = {
    Men: "https://t3.ftcdn.net/jpg/05/06/74/32/360_F_506743235_coW6QAlhxlBWjnRk0VNsHqaXGGH9F4JS.jpg",
    Women: "https://img.freepik.com/free-photo/beautiful-woman-getting-her-hair-cut-home-by-hairdresser_23-2148817217.jpg",
    Kids: "https://media.istockphoto.com/id/825461082/photo/5-year-old-getting-a-haircut.jpg?s=612x612&w=0&k=20&c=ax37u3ZD2p7odcIyhTO82hqww5lJ8fOAUJXsUVP2Ag8=",
    Funeral: funerR,
    Functions: Function,
  };

  const categories = {
    saloon: ['Men', 'Women', 'Kids'],
    doorstep: ['Men', 'Women', 'Kids', 'Funeral', 'Functions']

  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  useEffect(() => {
    if (selectedCategory && services[selectedCategory]?.length > 0) {
      setSelectedService(services[selectedCategory][0]);
    }
  }, [selectedCategory]);
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

  const isSlotBooked = (slot) => {
    const dateKey = selectedDate.toDateString()
    return bookedSlots[dateKey]?.includes(slot)
  }

  const handleSelectService = (service) => {
    setSelectedService(service)
  }

  const handleSelectSlot = (slot) => {
    setSelectedTime(slot)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedService(null)
    setSelectedTime(null)
  }

  const handleFreeService = () => {
    setShowModal(false); // Close the modal
    postRequest()
  };
  const handlePayupi = () => {
    setShowModal(false)
    postRequest()
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


  const handleScroll = () => {
    const Row = document.getElementById("target-section");
    Row.scrollIntoView({ behavior: "smooth" });
  }

  const handleScrollDown = () => {
    const section = document.getElementById("target-Sec");
    section.scrollIntoView({ behavior: "smooth" });
  }

  const handleDown = () => {
    const section = document.getElementById("target-down");
    section.scrollIntoView({ behavior: "smooth" });
  }

  const handleGoDown = () => {
    const section = document.getElementById("down");
    section.scrollIntoView({ behavior: "smooth" });
  }

  // const handleGo = () => {
  //   const section = document.getElementById("godown");
  //   section.scrollIntoView({ behavior: "smooth" });
  // }

  const handleClicked = () => {
    setShowModal(false);
  }

  const handlePayment = () => {
    // For other categories, both service and time slot are required
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
  // Function to handle button click
  const postRequest = async () => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Converts to YYYY-MM-DD format

    const data = {
      order_type: selectedOrderType,
      category: selectedCategory,
      amount: selectedService?.amount,
      services: selectedService?.name,  // Send service name instead of object
      date: formattedDate, // Correct format YYYY-MM-DD
      time: selectedTime, // Keep as string
      payment_status: status, // payment status for paid or pending
      payment_type: paytype, // payment type for online or offline
      customer_id: user.user_id, // Replace with actual user ID from backend
      username: user.username,
      status: bookedStatus
    };

    try {
      const response = await axios.post(
        // "https://1c9e-2409-408d-618-658e-15f8-262a-6616-c57e.ngrok-free.app/kovais/saloon/orders/",
        "https://api.capture360.ai/kovais/saloon/orders/",
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log("Success:", response.data);

      Swal.fire({
        title: "Success",
        text: "Your booking is confirmed!",
        icon: "success",
        allowOutsideClick: false, // Prevent closing by clicking outside
        allowEscapeKey: false, // Prevent closing with the Escape key
        allowEnterKey: false, // Prevent closing with the Enter key
      });
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
    <container fluid className="barber-container">
      <div className="the-boyz-page">
        {/* Carousel Section*/}
        <Carousel className="carousel-section" interval={2000} pause={false} controls={true} indicators={true}>
          <Carousel.Item>
            <img
              className="carousel-img"
              src="https://t4.ftcdn.net/jpg/05/26/31/19/360_F_526311939_DVS9EEQxMkg5NBmMG3tVbLHtUz9pYOuj.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-img"
              src="https://www.bubblesindia.com/wp-content/uploads/2019/03/Bubbles_Services_Banner_Haircut.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-img"
              src="https://t4.ftcdn.net/jpg/06/13/54/69/360_F_613546927_mU6uNbcz0UOYtihGtrQMjVHhJqYrqLxz.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        {/* Service Type Selection */}
        <section className="my-4">
          <h2 className="text-center" data-aos="fade-up">Service Type Selection</h2>
          <Row className="text-center justify-content-center">
            {[
              { type: "Saloon", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbG9ufGVufDB8fDB8fHww" },
              { type: "Door Step", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpzi9Qik5BfpRZiUkT0oxN4zcurAMD3ZA_w&s" }
            ].map(({ type, image }, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Card
                  className="text-center service-card"
                  data-aos="fade-up"
                  onClick={() => {
                    setSelectedOrderType(type);
                    handleScroll();
                    setServiceFor();
                  }}
                  style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "15px", overflow: "hidden" }}
                >
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={type}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body
                    style={{
                      width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: selectedOrderType === type ? "gray" : "transparent",
                      color: selectedOrderType === type ? "white" : "#000",
                    }}
                  >
                    <Button
                      style={{
                        fontSize: "18px",
                        width: "100%",
                        maxWidth: "200px",
                        borderRadius: "0 0 15px 15px",
                        border: "none",
                        boxShadow: "none",
                        transition: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        background: "none", // ✅ No background color
                        color: "inherit", // ✅ Inherits the text color from the parent
                      }}
                    >
                      {type}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Gender Selection */}
          <h2 className="text-center" id="target-section" data-aos="fade-up">Gender Selection</h2>
          <Row className="text-center my-3 justify-content-center">
            {(selectedOrderType === "Door Step" ? ["Men", "Women", "Kids", "Funeral", "Functions"] : ["Men", "Women", "Kids"]).map((category, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3" data-aos="fade-up">
                <Card
                  className="text-center service-card"
                  onClick={() => {
                    setSelectedCategory(category);
                    handleScrollDown();
                    setServiceFor(true);
                  }}
                  style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "15px", overflow: "hidden" }}
                >
                  <Card.Img
                    variant="top"
                    src={categoryImages[category]}
                    alt={category}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body
                    style={{
                      width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: selectedCategory === category ? "gray" : "transparent",
                      color: selectedCategory === category ? "white" : "#000",
                    }}
                  >
                    <Button
                      style={{
                        fontSize: "18px",
                        width: "100%",
                        maxWidth: "200px",
                        borderRadius: "0 0 15px 15px",
                        border: "none",
                        boxShadow: "none",
                        transition: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        background: "none", // ✅ No background color
                        color: "inherit", // ✅ Inherits the text color from the parent
                      }}
                    >
                      {category}
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Service Selection */}

        <section className="my-4 py-4 px-4" id='target-Sec'>
          <h2 className="text-center " data-aos="fade-up">Services for {serviceFor ? selectedCategory : ""}</h2>
          <Row className='d-flex justify-content-center align-item-center'>
            {serviceFor &&
              services[selectedCategory]?.map((service) => (
                <Col md={4} key={service.id}>
                  <Card
                    data-aos="fade-up"
                    className={`service-card ${selectedService?.id === service.id ? 'selected' : ''
                      }`}

                    onClick={() => {
                      handleSelectService(service)
                      handleDown()
                    }}
                  >
                    <Card.Img variant="top" src={service.imageUrl} style={{
                      width: "100%",
                      height: "200px", // Default height
                      objectFit: "cover",
                      borderRadius: "10px",
                      "@media (max-width: 768px)": { height: "150px" } // Smaller height on mobile
                    }} />
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">{service.name}
                        {/* <span> {service.amount}</span> */}
                        <Link to={`/service-info/${service.id}`} state={{ service }}>
                          Info
                        </Link>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </section>

        <section className="my-4" id='target-down'>
          <Row>
            <Col
              md={6}
              className="p-80 d-flex justify-content-center cal"
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
              <h4 className="text-center mb-4" data-aos="fade-up">Available Time Slots</h4>
              <Row className="text-center" data-aos="fade-up">
                {timeSlots.map((slot) => (
                  <Col key={slot} md={4} className="my-2">
                    <Button
                      style={{
                        backgroundColor: isSlotBooked(slot)
                          ? '#FF4081'
                          : selectedTime === slot
                            ? '#FF4081'
                            : 'transparent',
                        color: selectedTime === slot ? '#fff' : '#000',
                        borderColor: selectedTime === slot ? '#FF4081' : 'black',
                        width: '100%',
                        transition:
                          'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                      }}
                      onClick={() => {
                        handleSelectSlot(slot)
                        handleGoDown()
                      }}
                      disabled={isSlotBooked(slot)}
                    >
                      {slot}
                    </Button>
                  </Col>
                ))}
              </Row>

              <div className="d-flex justify-content-end mt-5" id='down' data-aos="fade-up">
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
        <Modal show={showModal} onHide={handleClicked} centered data-aos="fade-up">
          <Modal.Header closeButton>
            <Modal.Title>Payment Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={slide1} // Example banner image
              alt="Banner"
              className="img-fluid mb-3"
            />
            <p><strong>Price:</strong>{selectedService?.amount}</p>
            <p><strong>Service:</strong>{selectedService?.name}</p>
            <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
            <p><strong>Time:</strong>{selectedTime}</p>
            <Row>
              <Col>
                <Button variant="primary" className="w-100"
                  onClick={() => {
                    // handleFreeService()
                    // handleClicked()
                    setStatus("pending");
                    setPaytype("offline");
                  }}
                >
                  Book @0
                </Button>
              </Col>
              <Col>
                <Button variant="success" className="w-100"
                  onClick={() => {
                    // handlePayupi()
                    // handleClicked()
                    setStatus("paid");
                    setPaytype("online");
                  }}
                >
                  Pay with UPI
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="d-flex justify-content-even align-items-center  text-center">
                <label htmlFor="points" className="me-2"><b>Use Your Points:</b></label>
                <input
                  className="inp w-50"
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
              {/* <Col className="text-center mt-2">
                <p><strong>Balance Points:</strong> {point}</p>
              </Col> */}
            </Row>
            {/* <div className="mt-4 text-center"> */}
            {/* "Pay After Service" now as a button */}
            {/* <Button
                variant="secondary"
                className="w-100"
                onClick={() => {
                  // Handle confirm booking here
                  handleAfterService()
                  handleClicked() // Close modal after booking confirmation
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
    </container>
  )
}


export default TheBoyzPage
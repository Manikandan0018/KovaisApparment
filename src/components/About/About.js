import React, { useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import spa from "./spa.jpg";
import gym from "./gym.jpg";
import hotel from "./hotel.jpg";
import barber from "./barber.jpg";
import "./About.css"; // Import your CSS file
import { FaCheckCircle } from "react-icons/fa"; // Importing an icon for list items


function About() {
  const aboutImg = [
    {
      img: hotel,
      title: "Luxury AC Room",
      description: "hotel, building that provides lodging, meals, and other services to the traveling public on a commercial basis. A motel performs the same functions as a hotel but in a format designed for travelers using automobiles.",
    },
    {
      img: spa,
      title:"Spa",
      description: "A spa is an oasis of calm where people actively do something for the relaxation of body, mind, and spirit. This is achieved through treatments (message, beauty) as well as through fitness equipment for the body, through meditation or relaxation.",
    },
    {
      img: gym,
      title: "Modern Gym",
      description: "A gym is a large room, usually containing special equipment, where people go to do physical exercise and get fit. The gym has exercise bikes and running machines. While some guests play golf, others work out in the hotel gym. ",
    },
    {
      img: barber,
      title: "Barber Shop",
      description: "A salon is a gathering of people held by a host. These gatherings often consciously followed Horace's definition of the aims of poetry, either to please or to educate (Latin: aut delectare aut prodesse).",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
    <Container className="about-container mt-5">
      <Row className="justify-content-center">
        {/* Left Column - About Text */}
        <Col md={6} className="about-text">
          <h2 className="section-title">Welcome to <span>Kovais</span></h2>
          <p className="section-description">
            Your go-to platform for seamless pre-booking of premium services, including gyms, salons, spas, and hotels. 
            Our mission is to provide a hassle-free booking experience, ensuring convenience and efficiency for both customers and service providers.
          </p>
          <p className="section-description">
            At Kovais, we believe in enhancing user experience through a well-structured and easy-to-use platform. 
            Whether you're looking to schedule a fitness session, book a relaxing spa treatment, 
            reserve a salon appointment, or secure a hotel stay, Kovais makes it effortless with just a few clicks.
          </p>
        </Col>

        {/* Right Column - Benefits List */}
        <Col md={5} className="about-list">
          {/* <ul> */}
            {/* <li> */}
              <p><FaCheckCircle className="icon" /> <strong>Easy & Fast Booking</strong> - Reserve your favorite services anytime, anywhere.</p>
              {/* </li> */}
            {/* <li> */}
              <p><FaCheckCircle className="icon" /> <strong>Exclusive Offers</strong> - Access special discounts and promotions.</p>
              {/* </li> */}
            {/* <li> */}
              <p><FaCheckCircle className="icon" /> <strong>Reliable & Secure</strong> - Trusted platform ensuring secure transactions.</p>
              {/* </li> */}
            {/* <li> */}
              <p><FaCheckCircle className="icon" /> <strong>Customer-Centric Approach</strong> - Prioritizing your convenience and satisfaction.</p>
              {/* </li> */}
            {/* <li> */}
             <p> <FaCheckCircle className="icon" /> <strong>Join us today</strong> and experience a smarter way to book your favorite services!
              </p>
              {/* </li> */}
          {/* </ul> */}
        </Col>
      </Row>
    </Container>

      <Container className="about-container">
        <h2 className="text-center my-4">About Us</h2>
        <Row className="justify-content-center">
          {aboutImg.map((item, index) => (
            <Col md={6} lg={4} xl={3} key={index} className="mb-4">
              <Card className="about-card" data-aos="fade-up">
                <div className="image-container">
                  <Card.Img variant="top" src={item.img} className="card-image" />
                  <div className="overlay">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default About;

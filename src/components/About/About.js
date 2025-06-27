import React, { useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheckCircle } from "react-icons/fa";
import spa from "./spa.jpg";
import gym from "./gym.jpg";
import hotel from "./hotel.jpg";
import barber from "./barber.jpg";
import offer from "../Image/offer.png";
import "./About.css";

function About() {
  const aboutImg = [
    {
      img: hotel,
      title: "Luxury AC Room",
      description:
        "Elegant rooms with modern amenities and 24/7 comfort to make your stay extraordinary.",
    },
    {
      img: spa,
      title: "Tranquil Spa",
      description:
        "Relax, refresh, and rejuvenate with soothing massages and holistic treatments.",
    },
    {
      img: gym,
      title: "Modern Gym",
      description:
        "State-of-the-art fitness space equipped with everything you need to stay in shape.",
    },
    {
      img: barber,
      title: "Barber Lounge",
      description:
        "Get groomed in style with professional care and a welcoming atmosphere.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-black text-white font-space">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6} className="position-relative">
            <div className="about-left-image-wrapper">
              <img src={hotel} alt="Hotel" className="about-left-image" />
            </div>
          </Col>

          <Col md={6}>
            <img src={offer} alt="Special Offers" className="w-100 rounded shadow-lg" data-aos="fade-left" />
          </Col>
        </Row>

        <h3 className="text-center text-white mt-5 text-2xl md:text-3xl mb-4">Explore Our Services</h3>
        <Row className="g-4">
          {aboutImg.map((item, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="bg-dark text-white shadow-md border-0 rounded-xl overflow-hidden h-100" data-aos="zoom-in">
                <div className="relative h-52 overflow-hidden">
                  <Card.Img
                    src={item.img}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    alt={item.title}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-lg font-bold">{item.title}</Card.Title>
                  <Card.Text className="text-sm text-gray-400">{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default About;

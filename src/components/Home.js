import React, { useEffect, useState,useRef } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/img (1).jpeg';
import img2 from '../img/img (2).jpeg';
import img3 from '../img/img (3).jpeg';
import img4 from '../img/img (4).jpeg';
import banner1 from './kovais web banner/1.jpg';
import banner2 from './kovais web banner/2.jpg';
import banner3 from './kovais web banner/3.jpg';
import '../Carousel.css'
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";



import RippleCursor from '../userCorsor.js';


const images = [banner1,banner2,banner3];
















function Home({ user}) {
//updated manikandan//


 const slides = [
    {
      image: banner1,

    },
    {
      image: banner2,

    },
    {
      image: banner3,

    },
  ];

  const services = [
  { img: img1, title: 'Hotel', desc: 'Luxury stays at your fingertips', path: '/search-results' },
  { img: img2, title: 'Spa', desc: 'Relax & rejuvenate', path: '/spa' },
  { img: img3, title: 'Barber', desc: 'Look sharp always', path: '/barber' },
  { img: img4, title: 'Gym', desc: 'Stay fit, stay strong', path: '/gym' },
];






  ///update mani


  
 
// updated manikandan//





  const navigate = useNavigate();
  const currentUser = user || JSON.parse(localStorage.getItem("loggedInUser")); // Check if user exists
  

  const handleNavigation = (path) => {
    // if (currentUser) {
    //   navigate(path); // Navigate to the path if user is logged in
    // } else {
    //   navigate('/login'); // Redirect to login if user is not logged in
    // }
    navigate(path)
  };

    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

  return (
    <>
    <div className='bg-black h-200'>
      {/* <RippleCursor/> */}

      

      {/* <div>
        <h2 className="text-center mb-4">
          <b>About to <span className="text-danger font-weight-bold">Kovais Beauty</span></b>
        </h2>
        <About/>
      </div> */} 
   
 



    <div className='flex'>
<div className="relative mt-3 mx-auto border-gray-600 bg-gray-800 border-[8px] rounded-t-xl h-[400px] max-w-[1200px] md:h-[600px] w-full">
  <div className="rounded-lg overflow-hidden h-full w-full bg-white dark:bg-gray-800">
    <Carousel fade indicators={false} interval={5000} controls={true}>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx} className="h-full w-full">
          <div className="h-full w-full">
            <img
              src={slide.image}
              alt={`Slide ${idx}`}
              className="h-full w-full object-cover"
            />

           <h2 className="text-[80px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 animate-gradient-x text-center">
           Everything at Kovais
          </h2>

          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
</div>








<div className="relative mx-auto border-gray-700 dark:border-gray-700 bg-gray-700 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
  {/* Side buttons */}
  <div className="h-[32px] w-[3px] bg-gray-600 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
  <div className="h-[46px] w-[3px] bg-gray-600 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
  <div className="h-[46px] w-[3px] bg-gray-600 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
  <div className="h-[64px] w-[3px] bg-gray-600 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

  {/* Inner screen */}
  <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
    <section className="py-6 h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white" data-aos="fade-up">
          Our <span className="text-red-500">Services</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
          We provide the best grooming services.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-4">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="group bg-white dark:bg-gray-800 bg-opacity-80 backdrop-blur shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            onClick={() => navigate(service.path)}
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
            /> 
            
          </div>
 
          
        ))}
        
      </div>
    </section>
  </div>
</div>


</div>


<section className="py-16 px-6 ">
  <div className="max-w-3xl mx-auto text-center font-playfair" data-aos="fade-up" data-aos-duration="1000">
    <h2 className="text-5xl font-extrabold mb-4 text-white">
      Welcome to <span className="text-red-500 font-extrabold">Kovais</span>
    </h2>
    <p className="text-lg text-white leading-relaxed mt-4" data-aos="fade-up" data-aos-delay="200">
      Discover luxury living at <span className="font-semibold text-white">Kovais Apartments</span>, where comfort meets convenience.
      We offer not just a place to stay—but a lifestyle. Enjoy exclusive access to our
      <span className="text-red-500 font-extrabold"> premium hotel</span>,
      an in-house <span className="text-red-500 font-extrabold">gym</span>,
      a stylish <span className="text-red-500 font-extrabold">barber shop</span>,
      and a relaxing <span className="text-red-500 font-extrabold">massage center</span>. Everything you need is right at your doorstep.
    </p>
  </div>
</section>








    
        {/* HERO CAROUSEL */}




    










      {/* SERVICES SECTION */}
  <section className="py-20 ">
<div className="text-center mb-16">
  <h2
    className="text-5xl font-extrabold text-white"
    data-aos="fade-up"
  >
    Our <span className="text-red-500">Services</span>
  </h2>
  <p
    className="mt-4 text-lg text-white max-w-xl mx-auto"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    We provide the best grooming services with modern luxury experiences.
  </p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
  {services.map((service, idx) => (
    <div
      key={idx}
      onClick={() => navigate(service.path)}
      className="group max-w-sm mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300 cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={idx * 100}
    >
      <img
        src={service.img}
        alt={service.title}
        className="w-full h-70 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-5">
        <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {service.desc}
        </p>
        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300">
          View Details
          <svg
            className="ml-2 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </div>
      </div>
    </div>
  ))}
</div>

</section>



     
    











      
      {/* Services Section */}
      {/* <section className="text-center my-5 mx-2 section">
        <Container>
          <h2 className="mb-4" data-aos="fade-up">
            <b>Our <span className="text-danger font-weight-bold">Services</span></b>
          </h2>
          <Row className="mt-4 align-items-stretch space"> 
            <Col md={3}>
              <Card className="mb-4 hover-effect h-100 d-flex flex-column" data-aos="fade-up"
                onClick={() => handleNavigation("/search-results")}
              >
                <Card.Img variant="top" src={img1} alt="Hotel Service" />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title><b>Hotel</b></Card.Title>
                    <Card.Text>Book your stay for a luxury experience.</Card.Text>
                  </div>
                  <Button variant="danger">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4 hover-effect h-100 d-flex flex-column"
                onClick={() => handleNavigation('/spa')} data-aos="fade-up"
              >
                <Card.Img variant="top" src={img2} alt="Spa Service" />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title><b>Spa</b></Card.Title>
                    <Card.Text>Relax and rejuvenate. Pre-book your session.</Card.Text>
                  </div>
                  <Button variant="danger" className="text-center">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4 hover-effect h-100 d-flex flex-column"
                onClick={() => handleNavigation('/gym')} data-aos="fade-up"
              >
                <Card.Img variant="top" src={img4} alt="Gym Service" />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title><b>Gym</b></Card.Title>
                    <Card.Text>Get fit. Pre-book your session now.</Card.Text>
                  </div>
                  <Button variant="danger">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4 hover-effect h-100 d-flex flex-column"
                onClick={() => handleNavigation('/barber')} data-aos="fade-up"
              >
                <Card.Img variant="top" src={img3} alt="Barber Service" />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title><b>Barber</b></Card.Title>
                    <Card.Text>Look sharp. Pre-book your grooming session.</Card.Text>
                  </div>
                  <Button variant="danger">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section> */}


    </div>
    </>
  );
}

export default Home;






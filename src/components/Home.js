import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/img (1).jpeg';
import img2 from '../img/img (2).jpeg';
import img3 from '../img/img (3).jpeg';
import img4 from '../img/img (4).jpeg';
import banner1 from './kovais web banner/1.jpg';
import banner2 from './kovais web banner/2.jpg';
import banner3 from './kovais web banner/3.jpg';
import '../Carousel.css';
import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const images = [banner1, banner2, banner3];

function Home({ user, setUser }) {
  const slides = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
  ];

  const services = [
    { img: img1, title: 'Hotel', desc: 'Luxury stays at your fingertips', path: '/search-results' },
    { img: img2, title: 'Spa', desc: 'Relax & rejuvenate', path: '/spa' },
    { img: img3, title: 'Barber', desc: 'Look sharp always', path: '/barber' },
    { img: img4, title: 'Gym', desc: 'Stay fit, stay strong', path: '/gym' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Main Layout: Banner + Services Phone View */}
      <div className="flex flex-col lg:flex-row items-center justify-center px-4 lg:px-8 pt-6 gap-6">
        {/* Banner Section */}
        <div className="relative w-full lg:w-[70%] border-gray-600 bg-gray-800 border-[6px] md:border-[8px] rounded-xl h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
         <div className="relative w-full max-w-[1200px] mx-auto border-gray-600 bg-gray-800 border-[6px] md:border-[8px] rounded-xl overflow-hidden">
  {/* Carousel only contains images */}
  <Carousel fade indicators={false} interval={5000} controls>
    {slides.map((slide, idx) => (
      <Carousel.Item key={idx}>
        <img
          src={slide.image}
          alt={`Slide ${idx}`}
          className="w-full h-[230px] sm:h-[400px] md:h-[500px] lg:h-[600px] lg:w-[1010px] object-center"
        />
      </Carousel.Item>
    ))}
  </Carousel>
</div>



        </div>

        {/* Mobile Phone-like Service Preview */}
        <div className="relative w-full max-w-[320px] border-gray-700 bg-gray-700 border-[12px] md:border-[14px] rounded-[2rem] h-[500px] md:h-[600px] mx-auto">
          {/* Side Buttons */}
          <div className="h-[32px] w-[3px] bg-gray-600 absolute -start-[14px] md:-start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-600 absolute -start-[14px] md:-start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-600 absolute -start-[14px] md:-start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-600 absolute -end-[14px] md:-end-[17px] top-[142px] rounded-e-lg"></div>

          {/* Screen */}
          <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
            <section className="py-4 h-full flex flex-col overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="text-center mb-4 px-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white" data-aos="fade-up">
                  Our <span className="text-red-500">Services</span>
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
                  We provide the best grooming services.
                </p>
              </div>

              <div className="flex flex-col gap-3 px-4">
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
                      className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="py-14 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center font-playfair" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Welcome to <span className="text-red-500">Kovais</span>
          </h2>
          <p
            className="text-base sm:text-lg text-white leading-relaxed mt-2 sm:mt-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Discover luxury living at <span className="font-semibold text-white">Kovais Apartments</span>, where comfort meets convenience.
            We offer not just a place to stay—but a lifestyle. Enjoy exclusive access to our
            <span className="text-red-500 font-extrabold"> premium hotel</span>,
            an in-house <span className="text-red-500 font-extrabold">gym</span>,
            a stylish <span className="text-red-500 font-extrabold">barber shop</span>,
            and a relaxing <span className="text-red-500 font-extrabold">massage center</span>. Everything you need is right at your doorstep.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white" data-aos="fade-up">
            Our <span className="text-red-500">Services</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            We provide the best grooming services with modern luxury experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={() => navigate(service.path)}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.desc}</p>
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
    </div>
  );
}

export default Home;

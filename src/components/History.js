// import React, { useEffect, useState } from "react";
// import { Card, CardBody, Container, Button, Form } from "react-bootstrap";
// import "./History.css";

// const History = () => {
//   const [orders, setOrders] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [points, setPoints] = useState(200); // Default signup points



//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("loggedInUser");
//     if (!loggedInUser) {
//       console.warn("User not logged in!");
//       return;
//     }

//     const user = JSON.parse(loggedInUser);
//     const userId = user?.user_id;
//     setUserId(userId)
//     if (!userId) {
//       console.warn("User ID is not available!");
//       return;
//     }

//     const fetchCompletedOrders = async () => {
//       try {
//         const response = await fetch(
//           `https://api.capture360.ai/kovais/orders/?user_id=${userId}&status=completed`
//         );
//         if (!response.ok) throw new Error("Failed to fetch orders");
//         const data = await response.json();

//         const completedOrders = [
//           ...data.hotel_orders,
//           ...data.gym_orders,
//           ...data.spa_orders,
//           ...data.saloon_orders,
//         ];

//         setOrders(completedOrders);
//         // Calculate new total points (existing + earned)
// const totalPoints = userPoints + completedOrders.reduce((sum, order) => sum + (order.points || 100), 0);

// setPoints(totalPoints); // Update state

// // Update localStorage to persist new points
// const updatedUser = { ...user, points: totalPoints };
// localStorage.setItem("signedUpUser", JSON.stringify(updatedUser));
//       } catch (error) {
//         console.error("Error fetching completed orders:", error);
//       }
//     };

//     fetchCompletedOrders();
//   }, [userId]);

//   const handleFeedbackSubmit = async (orderId, rating, feedback) => {
//     try {
//       const response = await fetch(`https://your-api.com/orders/${orderId}/feedback`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rating, feedback }),
//       });

//       if (!response.ok) throw new Error("Failed to submit feedback");
//       alert("Feedback submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//     }
//   };

//   return (
//     <Container className="booking-history-container">
//       <h2 className="heade text-center">Your Completed Orders</h2>
//       <p className="text-center">Total Points: {points}</p>
//       {orders.length === 0 ? (
//         <p className="text-center">No completed orders yet.</p>
//       ) : (
//         orders.map((order) => (
//           <Card key={order.id} className="history-card">
//             <CardBody>
//               <h4>{order.category.charAt(0).toUpperCase() + order.category.slice(1)}</h4>
//               <p><strong>Service:</strong> {order.service_name || "N/A"}</p>
//               <p><strong>Completed Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
//               <p><strong>Points Earned:</strong> 100</p>

//               <Form onSubmit={(e) => {
//                 e.preventDefault();
//                 const rating = e.target.rating.value;
//                 const feedback = e.target.feedback.value;
//                 handleFeedbackSubmit(order.id, rating, feedback);
//               }}>
//                 <Form.Group>
//                   <Form.Label>Rating (1-5):</Form.Label>
//                   <Form.Control type="number" name="rating" min="1" max="5" required />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Label>Feedback:</Form.Label>
//                   <Form.Control as="textarea" name="feedback" required />
//                 </Form.Group>
//                 <Button type="submit" variant="success" className="mt-2">Submit Feedback</Button>
//               </Form>
//             </CardBody>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// };

// export default History;

import React, { useState, useEffect } from "react";
import { Card, Container, Button, Form, Row, Col } from "react-bootstrap";
import hotel from "./Image/hotl.jpg";
import gym from "./Image/Gym.jpg";
import saloon from "./Image/saloon.jpg";
import spa from "./Image/sp.jpg";
import axios from "axios";
import "./History.css";

const History = () => {
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [id, setId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [points, setPoints] = useState(0);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState({});

  const imageMap = {
    hotel: hotel,
    gym: gym,
    spa: spa,
    saloon: saloon,
  };

  useEffect(() => {
    const logginedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (logginedUser && logginedUser.user_id) {
      setId(logginedUser.user_id);
    }

    // Load submitted feedbacks from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem("submittedFeedbacks")) || {};
    const restoredRatings = {};
    const restoredComments = {};

    Object.keys(storedFeedbacks).forEach(orderId => {
      restoredRatings[orderId] = storedFeedbacks[orderId].rating;
      restoredComments[orderId] = storedFeedbacks[orderId].comment;
    });

    setSubmittedFeedbacks(Object.fromEntries(Object.keys(storedFeedbacks).map(id => [id, true])));
    setRatings(restoredRatings);
    setFeedbacks(restoredComments);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.capture360.ai/kovais/orders/?user_id=${id}&status=completed`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) throw new Error(`Failed to fetch orders: ${response.status}`);
        const data = await response.json();

        const allOrders = [
          ...data.hotel_orders.map((order) => ({
            ...order,
            guest_name: order.guest_name,
            service_type: "Deluxe Room (Ac)",
            serviceBy: "Veera",
            bookingDate: order.check_in,
            time: null,
            room_count: order.room_count,
            Category: "hotel",
            img: hotel,
            created_at: order.created_at,
          })),
          ...data.gym_orders.map((order) => ({
            ...order,
            guest_name: order.customer_name,
            service_type: order.plan,
            bookingDate: order.purchaseddate,
            time: order.timeslot,
            serviceBy: "Gokul",
            Category: "gym",
            img: gym,
            created_at: order.created_at,
          })),
          ...data.spa_orders.map((order) => ({
            ...order,
            guest_name: order.customer_name,
            service_type: order.services,
            bookingDate: order.date,
            time: order.time,
            serviceBy: "Guna",
            Category: "spa",
            img: spa,
            created_at: order.created_at,
          })),
          ...data.saloon_orders.map((order) => ({
            ...order,
            guest_name: order.customer_name,
            service_type: order.services,
            bookingDate: order.date,
            time: order.time,
            gender: order.category,
            serviceBy: "Anandh",
            Category: "saloon",
            img: saloon,
            created_at: order.created_at,
          })),
        ];

        setOrders(allOrders);
        const total = allOrders.reduce((acc, cur) => acc + (cur.points || 0), 0);
        setPoints(total);
      } catch (error) {
        console.error("Error fetching completed orders:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleRatingChange = (orderId, selectedRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [orderId]: selectedRating,
    }));
  };

  const handleFeedbackChange = (orderId, comment) => {
    setFeedbacks((prevFeedbacks) => ({
      ...prevFeedbacks,
      [orderId]: comment,
    }));
  };

  const handleFeedbackSubmit = async (e, orderId) => {
    e.preventDefault();
    const rating = ratings[orderId];
    const comment = feedbacks[orderId];

    if (!rating || !comment) {
      alert("Please give a rating and feedback before submitting.");
      return;
    }

    const payload = {
      customer_id: id,
      order_id: orderId,
      rating,
      comment,
    };

    try {
      await axios.post(`https://api.capture360.ai/kovais/post-review/`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Feedback submitted successfully!");

      // Save to localStorage
      const updated = {
        ...JSON.parse(localStorage.getItem("submittedFeedbacks") || "{}"),
        [orderId]: { rating, comment },
      };

      localStorage.setItem("submittedFeedbacks", JSON.stringify(updated));
      setSubmittedFeedbacks((prev) => ({
        ...prev,
        [orderId]: true,
      }));
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <Container className="booking-history-container">
      <h2 className="heade text-center">Your Completed Orders</h2>
      <p className="text-center">Total Points: 300</p>

      {orders.map((order) => (
        <Card key={order.id} className={`history-card ${order.Category}`}>
          <Row className="g-0">
            <Col md={6}>
              <Card.Body>
                <h4>{order.Category.charAt(0).toUpperCase() + order.Category.slice(1)}</h4>
                <p><strong>Name:</strong> {order.guest_name}</p>
                <p><strong>Service:</strong> {order.service_type}</p>
                <p><strong>Completed Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                <p><strong>Points Earned:</strong> 100</p>
                <p><strong>Serviced By:</strong> {order.serviceBy}</p>
                {order.Category === "saloon" && (
                  <p><strong>Gender:</strong> {order.gender}</p>
                )}

                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${ratings[order.id] >= star ? "filled" : ""}`}
                      onClick={() => {
                        if (!submittedFeedbacks[order.id]) {
                          handleRatingChange(order.id, star);
                        }
                      }}
                      style={{
                        cursor: submittedFeedbacks[order.id] ? "default" : "pointer",
                        color: ratings[order.id] >= star ? "#ffc107" : "#ccc",
                        fontSize: "20px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <Form onSubmit={(e) => handleFeedbackSubmit(e, order.id)}>
                  <Form.Group>
                    <Form.Label>Feedback:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="feedback"
                      value={feedbacks[order.id] || ""}
                      onChange={(e) => handleFeedbackChange(order.id, e.target.value)}
                      disabled={submittedFeedbacks[order.id]}
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="success"
                    className="mt-2"
                    disabled={submittedFeedbacks[order.id]}
                  >
                    Submit Feedback
                  </Button>
                </Form>
              </Card.Body>
            </Col>
            <Col md={6}>
              <div className="image-container">
                <img src={order.img} alt={order.Category} className="order-image" />
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default History;



// import React, { useState, useEffect } from "react";
// import { Card, Container, Button, Form , Row, Col} from "react-bootstrap";
// import hotel from "./Image/hotl.jpg"
// import gym from "./Image/Gym.jpg"
// import saloon from "./Image/saloon.jpg"
// import spa from "./Image/sp.jpg"
// import axios from "axios"
// import "./History.css";

// const History = () => {
//   const [ratings, setRatings] = useState({});
//   const [id, setId] = useState(null)
//   const [points, setPoints] = useState(); // Default 600 points for 4 completed orders

//   const [orders, setOrders] = useState([
//     // { id: 1,img: hotel , category: "hotel", service_name: "Deluxe Room", created_at: "2025-03-15", employee_name: "Veera", points: 100 },
//     // { id: 2,img: gym , category: "gym", service_name: "Monthly Membership", created_at: "2025-02-28", employee_name: "Jothis", points: 100 },
//     // { id: 3,img: spa , category: "spa", service_name: "Full Body Massage", created_at: "2025-02-20", employee_name: "Guna", points: 100 },
//     // { id: 4,img: saloon ,category: "saloon", service_name: "Haircut & Shave", created_at: "2025-02-10", employee_name: "Nithis", points: 100 },
//   ])

//   imageCategory={
//      hotel: hotel,
//         spa: spa,
//         barber: barber,
//         gym: gym,
//   }

//   // Handle Star Rating Selection
//   const handleRatingChange = (orderId, selectedRating) => {
//     setRatings(prevRatings => ({
//       ...prevRatings,
//       [orderId]: selectedRating
//     }));
//   };

  

 
//     // Fetch Completed orders
//     useEffect(() => {
//          // Fetch data from completed Orders
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.capture360.ai/kovais/orders/?user_id=${id}&status=completed/`,
//           // `https://4fe1-59-97-51-97.ngrok-free.app/kovais/orders/?user_id=${id}&status=completed`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json",
//             },
//           });
  
//         console.log("Fetched Completed Orders:", response.data);
//          setOrders(response.data); // Update available count
//       } catch (error) {
//         console.error("Error fetching completed orders:", error);
//       }
//     };
  
//       fetchData();
//     }, []);
  

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("signedUpUser"))
//     const points = user.points;
//     setPoints(points)
//     const totalPoints = points + orders.points;
//     setPoints(totalPoints);
//     const logginedUser = JSON.parse(localStorage.getItem("loggedInUser"))
//     const id = logginedUser.user_id
//     setId(id)
//   }, [])



//   return (
//     <Container className="booking-history-container">
//       <h2 className="heade text-center">Your Completed Orders</h2>
//       <p className="text-center">Total Points: 400</p>
      
//       {orders.map((order) => (
//   <Card key={order.id} className={`history-card ${order.category}`}>
//     <Row className="g-0"> {/* Ensures no gaps */}
//       <Col md={6}>
//         <Card.Body>
//           <h4>{order.category.charAt(0).toUpperCase() + order.category.slice(1)}</h4>
//           <p><strong>Service:</strong> {order.service_name}</p>
//           <p><strong>Completed Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
//           <p><strong>Points Earned:</strong> {order.points}</p>
//           <p><strong>Serviced By:</strong> {order.employee_name}</p>

//           {/* Star Rating System */}
//           <div className="star-rating">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 className={`star ${ratings[order.id] >= star ? "filled" : ""}`}
//                 onClick={() => handleRatingChange(order.id, star)}
//               >
//                 ★
//               </span>
//             ))}
//           </div>

//           {/* Feedback Form */}
//           <Form
//             onSubmit={(e) => {
//               e.preventDefault();
//               const feedback = e.target.feedback.value;
//               alert(`Feedback for ${order.service_name}: ${feedback}`);
//             }}
//           >
//             <Form.Group>
//               <Form.Label>Feedback:</Form.Label>
//               <Form.Control as="textarea" name="feedback" required />
//             </Form.Group>
//             <Button type="submit" variant="success" className="mt-2">
//               Submit Feedback
//             </Button>
//           </Form>
//         </Card.Body>
//       </Col>
//       <Col md={6}>
//         <div className="image-container">
//           <img src={order.img} alt={order.category} className="order-image" />
//         </div>
//       </Col>
//     </Row>
//   </Card>
// ))}

//     </Container>
//   );
// };

// export default History;

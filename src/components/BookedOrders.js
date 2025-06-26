import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingOrders.css";
import hotelImg from "./Image/Deluxe.jpg";
import gymImg from "./Image/Gym.jpg";
import barberImg from "./Image/barber.jpg";
import spaImg from "./Image/spa.jpg";
import axios from "axios";

const BookingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const imagesCategory = {
    hotel: hotelImg,
    spa: spaImg,
    saloon: barberImg,
    gym: gymImg,
  };

  const normalizeDate = (date) => {
    const d = typeof date === "string"
      ? new Date(date.split("T")[0] + "T12:00:00") // Force local timezone
      : new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
  };

  const todayStr = normalizeDate(new Date());

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      console.warn("User not logged in!");
      return;
    }

    const user = JSON.parse(loggedInUser);
    const userId = user?.user_id;
    setUserId(userId);
    if (!userId) {
      console.warn("User ID is not available!");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://api.capture360.ai/kovais/orders/?user_id=${userId}&status=booked`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error(`Failed to fetch orders: ${response.status}`);

        const data = await response.json();

        const allOrders = [
          ...data.hotel_orders.map((order) => ({
            id: order.id,
            guest_name: order.guest_name,
            category: "Deluxe Room (Ac)",
            check_in: order.check_in,
            room_count: 1,
            amount: order.amount,
            status: order.status,
            paymentStatus: order.payment_status,
            Category: "hotel",
          })),
          ...data.gym_orders.map((order) => ({
            id: order.id,
            guest_name: order.customer_name,
            category: order.plan,
            timeslot: order.timeslot,
            date: order.purchaseddate,
            amount: order.amount,
            status: order.status,
            paymentStatus: order.payment_status,
            Category: "gym",
          })),
          ...data.spa_orders.map((order) => ({
            id: order.id,
            guest_name: order.customer_name,
            category: order.services,
            date: order.date,
            time: order.time,
            amount: order.amount,
            status: order.status,
            paymentStatus: order.payment_status,
            Category: "spa",
          })),
          ...data.saloon_orders.map((order) => ({
            id: order.id,
            guest_name: order.customer_name,
            category: order.services,
            gender:order.category,
            date: order.date,
            time: order.time,
            amount: order.amount,
            status: order.status,
            paymentStatus: order.payment_status,
            Category: "saloon",
          })),
        ];

        const upcomingOrders = allOrders.filter((order) => {
          const orderDate = normalizeDate(order.check_in || order.date);
          return orderDate >= todayStr;
        });

        setOrders(upcomingOrders);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter((order) => {
    const matchesCategory = filter === "all" || order.Category === filter;

    const bookingDate = normalizeDate(order.check_in || order.date);
    const selectedDateStr = selectedDate ? normalizeDate(selectedDate) : null;

    const matchesDate = selectedDateStr ? bookingDate === selectedDateStr : true;

    return matchesCategory && matchesDate;
  });

  const handleCancel = async (orderId, order) => {
    try {
      const response = await axios.delete(
        `https://api.capture360.ai/kovais/delete-booking/?booking_id=${orderId}&user_id=${userId}&role=${order.Category}`
      );

      if (response.status === 204 || response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      } else {
        console.error("Failed to cancel order:", response);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handlePayment = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: "paid" } : order
      )
    );
  };

  return (
    <Container className="booking-history-container py-4">
      <h2 className="text-center mb-4">Your Upcoming Bookings</h2>
      <Row className="align-items-end mb-4">
        <Col md={8}>
          <div className="d-flex flex-wrap gap-2">
            {["all", "hotel", "spa", "gym", "saloon"].map((type) => (
              <Button
                key={type}
                variant={
                  type === "all"
                    ? "primary"
                    : type === "hotel"
                    ? "success"
                    : type === "spa"
                    ? "warning"
                    : type === "gym"
                    ? "info"
                    : "dark"
                }
                className="filter-btn px-3"
                onClick={() => setFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <label className="fw-semibold mb-2 d-block">Filter by Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="DD/MM/YYYY"
            dateFormat="dd/MM/yyyy"
            className="form-control shadow-sm"
          />
        </Col>
      </Row>

      {filteredOrders.length === 0 ? (
        <p className="text-center">No upcoming bookings.</p>
      ) : (
        filteredOrders.map((order) => (
          <Card key={order.id} className="mb-4 shadow-sm rounded">
            <Row className="g-0">
              <Col md={4}>
                <Card.Img
                  src={imagesCategory[order.Category]}
                  alt={order.Category}
                  className="h-100 object-fit-cover rounded-start"
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <h5 className="mb-3">
                    {order.Category.charAt(0).toUpperCase() + order.Category.slice(1)} Booking
                  </h5>
                  <p><strong>Guest:</strong> {order.guest_name}</p>
                  <p><strong>Service:</strong> {order.category}</p>

                  {order.Category === "hotel" && (
                    <>
                      <p><strong>Check-In:</strong> {normalizeDate(order.check_in)}</p>
                      <p><strong>Room Count:</strong> {order.room_count}</p>
                    </>
                  )}
                  {["spa", "gym", "saloon"].includes(order.Category) && (
                    <>
                      <p><strong>Date:</strong> {normalizeDate(order.date)}</p>
                      {order.time && <p><strong>Time:</strong> {order.time}</p>}
                      {order.timeslot && <p><strong>Time Slot:</strong> {order.timeslot}</p>}
                      {order.plan && <p><strong>Plan:</strong> {order.plan}</p>}
                    </>
                  )}
                   {order.Category === "saloon" && (
                    <>
                      <p><strong>Gender:</strong> {order.gender}</p>
                    </>
                  )}
                  <p><strong>Price:</strong> ₹{order.amount} ({order.paymentStatus})</p>
                  <p><strong>Status:</strong> {order.status}</p>

                  <Row className="mt-3">
                    <Col md={6}>
                      {order.paymentStatus.toLowerCase() === "pending" ? (
                        <Button variant="success" onClick={() => handlePayment(order.id)} className="w-100">
                          Pay Now
                        </Button>
                      ) : (
                        <Button variant="secondary" className="w-100" disabled>
                          Paid
                        </Button>
                      )}
                    </Col>
                    <Col md={6}>
                      <Button variant="danger" onClick={() => handleCancel(order.id, order)} className="w-100">
                        Cancel Booking
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))
      )}
    </Container>
  );
};

export default BookingOrders;


// import React, { useState } from "react";
// import { Row, Col, Card, Container, Button } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./BookingOrders.css";
// import hotelImg from "./Image/Deluxe.jpg";
// import gymImg from "./Image/Gym.jpg";
// import barberImg from "./Image/barber.jpg";
// import spaImg from "./Image/spa.jpg";

// const BookingOrders = () => {
//   const [orders, setOrders] = useState([
//     { id: 1, guest_name: "John Doe", category: "Deluxe Room (Ac)", amount: "2591", check_in: "04/20/2025", room_count: "1", status: "Booked", paymentStatus: "Pending", Category: "hotel" },
//     { id: 2, guest_name: "Jane Smith", category: "Full Body Spa", amount: "1500", time: "3:00 PM", date: "04/21/2025", status: "Booked", paymentStatus: "Paid", Category: "spa" },
//     { id: 3, guest_name: "Mike Johnson", category: "Monthly Membership", amount: "999", plan: "Gold", date: "04/23/2025", timeslot: "6:00 AM - 7:00 AM", status: "Booked", paymentStatus: "Pending", Category: "gym" },
//     { id: 4, guest_name: "Jothis", category: "Haircut", amount: "100", timeslot: "6:00 PM", date: "04/22/2025", status: "Booked", paymentStatus: "Paid", Category: "barber" },
//   ]);

//   const [filter, setFilter] = useState("all");
//   const [selectedDate, setSelectedDate] = useState(null);

//   const imagesCategory = {
//     hotel: hotelImg,
//     spa: spaImg,
//     barber: barberImg,
//     gym: gymImg,
//   };

//   const normalizeDate = (date) => new Date(date).toISOString().split("T")[0];
//   const todayStr = normalizeDate(new Date());

//   const upcomingOrders = orders.filter((order) => {
//     const orderDate = normalizeDate(order.check_in || order.date);
//     return orderDate >= todayStr;
//   });

//   const filteredOrders = upcomingOrders.filter((order) => {
//     const matchesCategory = filter === "all" || order.Category === filter;
//     const matchesDate = selectedDate
//       ? normalizeDate(order.check_in || order.date) === normalizeDate(selectedDate)
//       : true;
//     return matchesCategory && matchesDate;
//   });


//       // Fetch available rooms dynamically
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(
//             // "https://api.capture360.ai/kovais/room-count/",
//             `https://4fe1-59-97-51-97.ngrok-free.app/kovais/orders/?user_id=${id}&status=completed`,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//               },
//             });
    
//           console.log("Fetched Available Rooms:", response.data);
//            setOrders(response.data); // Update available count
//         } catch (error) {
//           console.error("Error fetching available rooms:", error);
//         }
//       };
    
//       // Fetch room availability on component mount
//       useEffect(() => {
//         fetchData();
//       }, []);
  

//   const handleCancel = (orderId) => {
//     setOrders(orders.filter((order) => order.id !== orderId));
//   };

//   const handlePayment = (orderId) => {
//     setOrders(
//       orders.map((order) =>
//         order.id === orderId ? { ...order, paymentStatus: "Paid" } : order
//       )
//     );
//   };

//   return (
//     <Container className="booking-history-container py-4">
//       <h2 className="text-center mb-4">Your Upcoming Bookings</h2>
//       <Row className="align-items-end mb-4">
//         <Col md={8}>
//           <div className="d-flex flex-wrap gap-2">
//             {["all", "hotel", "spa", "gym", "barber"].map((type) => (
//               <Button
//                 key={type}
//                 variant={
//                   type === "all"
//                     ? "primary"
//                     : type === "hotel"
//                     ? "success"
//                     : type === "spa"
//                     ? "warning"
//                     : type === "gym"
//                     ? "info"
//                     : "dark"
//                 }
//                 className="filter-btn px-3"
//                 onClick={() => setFilter(type)}
//               >
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </Button>
//             ))}
//           </div>
//         </Col>
//         <Col md={4}>
//           <label className="fw-semibold mb-2 d-block">Filter by Date:</label>
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             minDate={new Date()}
//             placeholderText="MM/DD/YYYY"
//             className="form-control shadow-sm"
//           />
//         </Col>
//       </Row>

//       {filteredOrders.length === 0 ? (
//         <p className="text-center">No upcoming bookings.</p>
//       ) : (
//         filteredOrders.map((order) => (
//           <Card key={order.id} className="mb-4 shadow-sm rounded">
//             <Row className="g-0">
//               <Col md={4}>
//                 <Card.Img
//                   src={imagesCategory[order.Category]}
//                   alt={order.Category}
//                   className="h-100 object-fit-cover rounded-start"
//                 />
//               </Col>
//               <Col md={8}>
//                 <Card.Body>
//                   <h5 className="mb-3">
//                     {order.Category.charAt(0).toUpperCase() + order.Category.slice(1)} Booking
//                   </h5>
//                   <p><strong>Guest:</strong> {order.guest_name}</p>
//                   <p><strong>Service:</strong> {order.category}</p>

//                   {order.Category === "hotel" && (
//                     <>
//                       <p><strong>Check-In:</strong> {new Date(order.check_in).toLocaleDateString()}</p>
//                       <p><strong>Room Count:</strong> {order.room_count}</p>
//                     </>
//                   )}
//                   {["spa", "gym", "barber"].includes(order.Category) && (
//                     <>
//                       <p><strong>Date:</strong> {order.date}</p>
//                       {order.time && <p><strong>Time:</strong> {order.time}</p>}
//                       {order.timeslot && <p><strong>Time Slot:</strong> {order.timeslot}</p>}
//                       {order.plan && <p><strong>Plan:</strong> {order.plan}</p>}
//                     </>
//                   )}

//                   <p><strong>Price:</strong> ₹{order.amount} ({order.paymentStatus})</p>
//                   <p><strong>Status:</strong> {order.status}</p>

//                   <Row className="mt-3">
//                     <Col md={6}>
//                       {order.paymentStatus === "Pending" ? (
//                         <Button variant="success" onClick={() => handlePayment(order.id)} className="w-100">
//                           Pay Now
//                         </Button>
//                       ) : (
//                         <Button variant="secondary" className="w-100" disabled>
//                           Paid
//                         </Button>
//                       )}
//                     </Col>
//                     <Col md={6}>
//                       <Button variant="danger" onClick={() => handleCancel(order.id)} className="w-100">
//                         Cancel Booking
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Card.Body>
//               </Col>
//             </Row>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// };

// export default BookingOrders;
// const loggedInUser = localStorage.getItem("loggedInUser");
// if (!loggedInUser) {
//   console.warn("User not logged in!");
//   return;
// }

// const user = JSON.parse(loggedInUser);
// const userId = user?.user_id;
// setUserId(userId)
// if (!userId) {
//   console.warn("User ID is not available!");
//   return;
// }

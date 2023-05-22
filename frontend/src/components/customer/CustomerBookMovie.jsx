import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import SeatSelector from "../seatselection/SeatSelector";
import MovieService from "../../services/MovieService";
import CinemaRoomService from "../../services/CinemaRoomService";
import TicketService from "../../services/TicketService";
import CartService from "../../services/CartService";

const CustomerBookMovie = () => {
  const { movieid } = useParams();
  const [movie, setMovie] = useState(null);
  const [room, setRoom] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const customerId = localStorage.getItem("customerId");

  const [ticketQuantities, setTicketQuantities] = useState({
    adult: 0,
    child: 0,
    student: 0,
    senior: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getMovie(movieid);
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setTicketQuantities((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const getMovie = (movieid) => {
    MovieService.getSingleMovie(movieid)
      .then((res) => {
        setMovie(res.data);
        getRoom(res.data.room);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRoom = (id) => {
    CinemaRoomService.findCinemaRoomById(id)
      .then((res) => {
        setRoom(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // handle error when rendering
  if (!movie || !room) {
    return <div>Loading ...</div>;
  }

  const convertNum = (num) => {
    if (num < 1 || num > 26 || typeof num !== "number") {
      return -1;
    }
    const bound = 64; // ASCII: A = 65
    return String.fromCharCode(num + bound);
  };

  const handleSeatSelection = (selectedSeats) => {
    setSelectedSeat(selectedSeats);
  };

  const createCustomerTicket = () => {
    const totalSelectedTickets = Object.values(ticketQuantities).reduce(
      (total, quantity) => total + quantity,
      0
    );
  
    if (
      totalSelectedTickets === 0 ||
      !selectedSeat ||
      selectedSeat.length === 0
    ) {
      return;
    }
  
    // assign seats accordingly
    const tickets = [];
    let seatIndex = 0;
  
    Object.entries(ticketQuantities).forEach(([ticketType, quantity]) => {
      for (let i = 0; i < quantity; i++) {
        const seat = selectedSeat[seatIndex];
  
        // convert seatNumber before saving
        const seatNumber = `${convertNum(seat.row)}${seat.col}`;
  
        const ticket = {
          seatNumber: seatNumber,
          movie: movie.id,
          user: customerId,
          room: room.id,
          ticketType: ticketType,
          price: calculateTicketPrice(ticketType),
        };
  
        tickets.push(ticket);
  
        seatIndex++;
        if (seatIndex === selectedSeat.length) {
          seatIndex = 0; // reset selected seats array
        }
      }
    });
  
    // save the tickets if there are any
    if (tickets.length > 0) {
      TicketService.createTicket(tickets)
        .then((res) => {
          if (res.status === 200) {
            const createdTickets = res.data;
            console.log(res.data);
            console.log(tickets);
            alert("Ticket booking confirmed");

            const newTicketIds = createdTickets.map((ticket) => ticket.id);
            // console.log(newTicketIds);
 
            // update the cart with the newly created ticketIds
            const updatedCartDetails = {
              userId: customerId,
              isCheckedOut: false,
              ticketIds: newTicketIds,
              foodDrinkIds: [],
              rewardIds: [],
            };
  
            CartService.updateCart(updatedCartDetails)
              .then(() => {
                console.log("Cart updated successfully");
                navigate(-1);
              })
              .catch((e) => {
                console.log(`Error updating cart: ${e}`);
              });
          } else {
            alert(`Error occurred: ${res.data}`);
          }
        })
        .catch((e) => {
          alert(`Error occurred: ${e}`);
        });
    }
  };
  
  const getTotalPrice = () => {
    let total = 0;

    Object.entries(ticketQuantities).forEach(([ticketType, quantity]) => {
      const ticketPrice = calculateTicketPrice(ticketType);
      total += ticketPrice * quantity;
    });

    return total;
  };
  
  // fixed ticket pricing
  const calculateTicketPrice = (ticketType) => {
    switch (ticketType) {
      case 'adult':
        return 10.0;
      case 'student':
        return 7.0;
      case 'child':
        return 6.0;
      case 'senior':
        return 5.0;
      default:
        return 0.0;
    }
  };

  return (
    <div>
      <div>
        <h2>Movie Details</h2>
        <img src={movie.poster} alt={movie.title} />
        <h3>Title: {movie.title}</h3>
        <p>IMDb ID: {movie.movieid}</p>
        <p>Start Time: {movie.startTime}</p>
        <p>Rating: {movie.avgRating}</p>
      </div>
      <div>
        <h3>Booking</h3>
        <p>Select Ticket Quantity</p>
        <label>Adult:</label>
        <input
          type="number"
          id="adult"
          name="adult"
          min="0"
          value={ticketQuantities.adult}
          onChange={handleChangeInput}
          onKeyDown={(e) => e.preventDefault()}
        />
        <label>Child:</label>
        <input
          type="number"
          id="child"
          name="child"
          min="0"
          value={ticketQuantities.child}
          onChange={handleChangeInput}
          onKeyDown={(e) => e.preventDefault()}
        />
        <label>Student:</label>
        <input
          type="number"
          id="student"
          name="student"
          min="0"
          value={ticketQuantities.student}
          onChange={handleChangeInput}
          onKeyDown={(e) => e.preventDefault()}
        />
        <label>Senior:</label>
        <input
          type="number"
          id="senior"
          name="senior"
          min="0"
          value={ticketQuantities.senior}
          onChange={handleChangeInput}
          onKeyDown={(e) => e.preventDefault()}
        />
        <h3>Seating Selection</h3>
        <SeatSelector
          numRows={room.numRows}
          numCols={room.numCols}
          onSeatSelection={handleSeatSelection}
        />
        <br></br>
        <p>
          Subtotal: <span>{getTotalPrice()}</span>
        </p>
      </div>
      <div>
        <h3>Reviews</h3>
      </div>
      <div>
        <button onClick={createCustomerTicket}>Book Now</button>
      </div>
      <button onClick={() => navigate(-1)}>Return</button>
    </div>
  );
};

export default CustomerBookMovie;

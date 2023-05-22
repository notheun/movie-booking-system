import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import RatingAndReview from "./RatingAndReview";
import SeatSelector from "../seatselection/SeatSelector";
import MovieService from "../../services/MovieService";
import CinemaRoomService from "../../services/CinemaRoomService";
import TicketService from "../../services/TicketService";
import CartService from "../../services/CartService";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CustomerNavbar from "./CustomerNavbar";
import "./css/CustomerBookMovie.css";
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
        console.log(res.data);
        setMovie(res.data);
        getRoom(res.data.room);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRoom = (id) => {
    CinemaRoomService.getRoomById(id)
      .then((res) => {
        setRoom(res.data);
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
      case "adult":
        return 10.0;
      case "student":
        return 7.0;
      case "child":
        return 6.0;
      case "senior":
        return 5.0;
      default:
        return 0.0;
    }
  };

  return (
    <>
      <SignedOutNavbar />
      <CustomerNavbar />
      <div className="outersection">
        <div className="movie_banner">
          <div className="image_wrapper">
            <div className="image_bg"></div>
            <img src={movie.poster} alt={movie.title} />
          </div>
          <div className="movie_content">
            <div className="movie_info">
              <h2 className="movie_detailBox">Movie Details</h2>
              <h3 className="movie_name">{movie.title}</h3>
              <div class="movie_other_info">
                <p className="other_info_key">IMDb ID: {movie.movieid}</p>
              </div>
              <div class="movie_other_info">
                <p className="other_info_key">Start Time: {movie.startTime}</p>
              </div>
              <div class="movie_other_info">
                <p className="other_info_key">Rating: {movie.avgRating}</p>
              </div>
              {/* </div>
          </div>
        </div>
      </div> */}
              <div className="loginForm">
                <h3 className="book_now_text">BOOK NOW</h3>

                <p className="select_ticket_quantity_text">
                  Select Ticket Quantity
                </p>
                <div class="form_container">
                  <div class="form_input_item">
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
                  </div>
                  <div class="form_input_item">
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
                  </div>
                  <div class="form_input_item">
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
                  </div>
                  <div class="form_input_item">
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
                  </div>
                </div>
              </div>
              <div className="seat_selection_box">
                <h4 className="main_topic_name">SELECT YOUR SEAT</h4>
                <div className="seat_box_main">
                  <SeatSelector
                    numRows={room.numRows}
                    numCols={room.numCols}
                    onSeatSelection={handleSeatSelection}
                  />
                  <br></br>
                </div>
              </div>
              <div>
                <div>
                  <div class="movie_other_info">
                    <p className="other_info_key">
                      Subtotal: $ <span>{getTotalPrice()}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="booknow_btn"
                    onClick={createCustomerTicket}
                  >
                    Book Now
                  </button>
                </div>
                <span
                  span
                  className="custMovieBottomText"
                  onClick={() => navigate(-1)}
                >
                  Return
                </span>
              </div>
              <div className="book_now_text">
                <RatingAndReview />
                {/* <h3 className="book_now_text">Reviews</h3> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerBookMovie;
{
  /* 

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
}; */
}

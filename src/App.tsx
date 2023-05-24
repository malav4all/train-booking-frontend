import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [seats, setSeats] = useState([]);
  const [bookingCount, setBookingCount] = useState<any>();

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/seats");
      setSeats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const bookSeats = async () => {
    try {
      const response: any = await axios.post("http://localhost:8000/api/book", {
        bookingCount,
      });
      if (response.status === 200) {
        setSeats(response?.data?.updatedSeats);
        alert("Seat booked SuccessFully");
        setBookingCount("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(error?.response?.data?.errorMessage);
      }
    }
  };

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 && inputValue <= 7) {
      setBookingCount(e.target.value);
    }
  };
  const renderSeats = () => {
    return seats.map((item: any, index: any) => {
      return (
        <>
          <div
            style={{
              boxSizing: "border-box",
              width: "10%",
              padding: "20px",
              border: "1px solid #000",
              backgroundColor: item.isAvailable ? "red" : "green",
            }}
          >
            <h1>
              Seat No:{item.seatNumber}{" "}
              {item.isAvailable ? "Booked" : "Available"}
            </h1>
          </div>
        </>
      );
    });
  };

  return (
    <div>
      <h2>Train Seat Booking</h2>
      <div>
        <input
          type="number"
          min="1"
          max="7"
          value={bookingCount}
          onChange={handleChange}
        />
        <button onClick={bookSeats}>Book Seats</button>
        {/* Add more buttons for different seat counts */}
      </div>
      <div
        className="seats-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "70px",
        }}
      >
        {renderSeats()}
      </div>

      {/* {bookingCount > 0 && <p>{bookingCount} seat(s) booked successfully!</p>} */}
    </div>
  );
}

export default App;

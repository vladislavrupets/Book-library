import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "@mui/icons-material";

import { fetchBookById } from "../../../store/bookSlice";
import { createBorrowing } from "../../../store/borrowingSlice";
import "./bookBorrowingPage.css";

const today = new Date().toISOString().split("T")[0];
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);
const maxDate = nextMonth.toISOString().split("T")[0];

const BookBorrowingPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.book);
  const { borrowings } = useSelector((state) => state.borrowing);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysForBorrowing, setDaysForBorrowing] = useState(7);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, []);

  const handleBorrowingDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
    const newReturnDate = new Date(selectedDate);
    newReturnDate.setDate(newReturnDate.getDate() + daysForBorrowing);
    const maxReturnDate = new Date(selectedDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 30);
    if (newReturnDate > maxReturnDate) {
      setEndDate(maxReturnDate.toISOString().split("T")[0]);
    } else {
      setEndDate(newReturnDate.toISOString().split("T")[0]);
    }
  };

  const handleDaysChange = (event) => {
    let days = parseInt(event.target.value, 10);
    if (days > 30) {
      days = 30;
    } else if (days < 1 || isNaN(days) || !days) {
      days = 1;
    }
    setDaysForBorrowing(days);
    const newReturnDate = new Date(startDate);
    newReturnDate.setDate(newReturnDate.getDate() + days);
    const maxReturnDate = new Date(startDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 30);
    if (newReturnDate > maxReturnDate) {
      setEndDate(maxReturnDate.toISOString().split("T")[0]);
    } else {
      setEndDate(newReturnDate.toISOString().split("T")[0]);
    }
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        createBorrowing({
          bookId,
          startDate,
          endDate,
        })
      );
      navigate("/borrowings-list");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">Book Borrowing</h2>
      </div>
      <div className="content-container__item">
        {status === "loading" && <div>Loading...</div>}
        {status === "rejected" && <div>{error}</div>}
        {status === "resolved" && (
          <div className="card">
            <div className="card__header">
              <h3 className="card__header-title">{books.writing.title}</h3>
            </div>
            <div className="card__body">
              <div className="card__body-container">
                <div className="card__body-container--item">
                  <div className="borrowing-book-card">
                    <div
                      className="borrowing-book-card__cover"
                      style={{
                        backgroundImage: `url(${books.cover_url})`,
                      }}
                    />

                    <div className="borrowing-book-card__details">
                      <div className="borrowing-book-card__details-container">
                        <h3 className="borrowing-book-card__genre">Genres:</h3>
                        <span>
                          {books.genres
                            .map((genre) => genre?.genre_name)
                            .join(", ")}
                        </span>
                      </div>
                      <div className="borrowing-book-card__details-container">
                        <h3 className="borrowing-book-card__author">
                          Authors:
                        </h3>
                        <span>
                          {books.authors
                            .map((author) => author?.full_name)
                            .join(", ")}
                        </span>
                      </div>
                      <div className="borrowing-book-card__details-container">
                        <h3 className="borrowing-book-card__title">
                          Publisher:
                        </h3>
                        <span>{books.publisher.publisher_name}</span>
                      </div>
                      <div className="borrowing-book-card__details-container">
                        <h3 className="borrowing-book-card__title">
                          Release year:
                        </h3>
                        <span>{books.release_year}</span>
                      </div>
                      <div className="borrowing-book-card__details-container">
                        <h3 className="borrowing-book-card__title">
                          Pages count:
                        </h3>
                        <span>{books.pages_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card__body-container--item">
              <form
                className="form-container"
                onSubmit={(e) => handleClickSubmit(e)}
              >
                <div className="form-group">
                  <label>Borrowing date:</label>
                  <input
                    className="date-selector"
                    type="date"
                    min={today}
                    max={maxDate}
                    value={startDate}
                    onChange={handleBorrowingDateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Days for borrowing:</label>
                  <div className="input-group">
                    <input
                      className="borrowing-input"
                      type="number"
                      min={1}
                      max={30}
                      value={daysForBorrowing}
                      onChange={handleDaysChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Return date:</label>
                  <input
                    className="date-selector"
                    type="date"
                    min={startDate}
                    max={
                      new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000
                    }
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button className="main-button visible">
                    <Check />
                    <h4>Submit</h4>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookBorrowingPage;

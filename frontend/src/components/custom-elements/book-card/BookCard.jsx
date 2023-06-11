import "./bookCard.css";
import { Add } from "@mui/icons-material";

const BookCard = ({ title, author, genre, releaseYear, coverUrl }) => {
  return (
    <div className="book-card">
      <div
        className="book-card__cover"
        style={{ backgroundImage: `url(${coverUrl})` }}
      ></div>
      <div className="book-card__details">
        <div className="book-card__details-container">
          <h3 className="book-card__title">
            {title} - {releaseYear}
          </h3>
        </div>
        <div className="book-card__details-container">
          <h4 className="book-card__genre">{genre}</h4>
        </div>
        <div className="book-card__details-container">
          <h4 className="book-card__author">By: {author}</h4>
        </div>
      </div>

      <button className="main-button visible">
        <Add />
        <h4>To borrow</h4>
      </button>
    </div>
  );
};

export default BookCard;

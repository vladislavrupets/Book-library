const BookCard = ({ title, author, genre, releaseYear, coverUrl }) => {
  return (
    <div className="book-card">
      <div className="book-card__cover">
        <img src={coverUrl} alt="Book Cover" />
      </div>
      <div className="book-card__details">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">By: {author}</p>
      </div>
    </div>
  );
};

export default BookCard;

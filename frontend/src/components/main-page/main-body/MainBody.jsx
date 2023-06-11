import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./mainBody.css";
import { fetchBooks } from "../../../store/bookSlice";
import BookCard from "../../custom-elements/book-card/BookCard";
import Pagination from "../../custom-elements/pagination/Pagination";

const itemsPerPage = 10;

const MainBody = () => {
  const dispatch = useDispatch();
  const { books, booksCount, status, error } = useSelector(
    (state) => state.book
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBooks({ currentPage, itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">Library</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__body">
            <div className="card__body-container">
              {status === "loading" ? (
                <div>Loading...</div>
              ) : status === "rejected" ? (
                <div>Error: {error}</div>
              ) : (
                <div className="card__body-container--item">
                  <div className="books-container">
                    {books.map((book) => (
                      <BookCard
                        title={book.writing.title}
                        author={book.authors[0].full_name}
                        genre={book.genres[0].genre_name}
                        releaseYear={book.release_year}
                        coverUrl={book.cover_url}
                        key={book.id}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="card__body-container--item">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(booksCount / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;

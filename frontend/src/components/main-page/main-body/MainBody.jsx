import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./mainBody.css";
import { fetchBooks } from "../../../store/bookSlice";
import BookCard from "../../custom-elements/book-card/BookCard";

const MainBody = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.book);

  const currentPage = 1;
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchBooks({ currentPage, itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const totalItemsCount = books.length;
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  return (
    <div className="content-container">
      <div className="content-container__item">
        <div className="card">
          <div className="card__header">
            <h3 className="card__header-title">Add book</h3>
          </div>
          <div className="card__body">
            <div className="card__body-container">
              <div className="card__body-container--item">
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
              <div className="card__body-container--item">
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      dispatch(
                        fetchBooks({
                          currentPage: currentPage - 1,
                          itemsPerPage,
                        })
                      )
                    }
                  >
                    Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      dispatch(
                        fetchBooks({
                          currentPage: currentPage + 1,
                          itemsPerPage,
                        })
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;

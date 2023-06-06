import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../store/bookSlice";

import "./bookStyles.css";

const BookList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { books, status } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks());
    console.log(1);
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return <div>Error: {error}</div>;
  }

  if (status === "resolved") {
    return (
      <div className="content-container">
        <div className="content-container__header">
          <h2 className="content-container__header-title">Books</h2>
        </div>
        <div className="content-container__item">
          <div className="card">
            <div className="card__header">
              <h3 className="card__header-title">Book list</h3>
              <div className="card__header-buttons">
                <button
                  className="main-button visible"
                  onClick={() => navigate("/dashboard/books/add-book")}
                >
                  <Add />
                  <span>Add book</span>
                </button>
              </div>
            </div>
            <div className="card__body">
              <div className="card__body-container--item">
                <div className="dash-book-card">
                  <table className="table">
                    <thead className="table__header">
                      <tr>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Cover</span>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Title
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Genres
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Authors
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Publisher
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Release year
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Pages count
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Quantity
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            Edit book
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table__body">
                      {books.map((book) => (
                        <tr className="table__row" key={book.book_id}>
                          <td className="table__row-item">
                            <div
                              className="book-cover"
                              style={{
                                backgroundImage:
                                  "url(https://i.pinimg.com/originals/d0/0a/20/d00a20365c0303a5e4b450ed8b334587.jpg)",
                              }}
                            ></div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                {book.writing.title}
                              </div>
                            </div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                {book.genres.map((genre) => (
                                  <span key={genre.genre_id}>
                                    {genre.genre_name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                {book.authors.map((author) => (
                                  <span key={author.author_id}>
                                    {author.full_name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                {book.publisher.publisher_name}
                              </div>
                            </div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                {book.release_year}
                              </div>
                            </div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                {book.pages_count}
                              </div>
                            </div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                {book.quantity}
                              </div>
                            </div>
                          </td>
                          <td className="table__row-item">
                            <div className="table__row-item--content">
                              <div className="table__row-item--content-inner">
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    navigate("/dashboard/books/edit-book")
                                  }
                                >
                                  <Edit fontSize="small" />
                                  <span>Edit</span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BookList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add, SearchOutlined, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import "./dashBook.css";
import { searchBooks } from "../../../store/bookSlice";
import Input from "../../custom-elements/input/Input";
import Pagination from "../../custom-elements/pagination/Pagination";

const itemsPerPage = 10;

const BookList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { books, booksCount, status, error } = useSelector(
    (state) => state.book
  );
  const [inputSearchContent, setInputSearchContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      searchBooks({
        currentPage,
        itemsPerPage,
        searchData: inputSearchContent,
      })
    );
  }, [dispatch, currentPage, itemsPerPage]);

  const handleClickSearch = () => {
    setCurrentPage(1);
    dispatch(
      searchBooks({ currentPage, itemsPerPage, searchData: inputSearchContent })
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
              <div className="card__body-container">
                <div className="card__body-buttons">
                  <Input
                    value={inputSearchContent}
                    onChange={(e) => setInputSearchContent(e.target.value)}
                    visibility={true}
                    placeholder="Example: title=Harry Potter; releaseYear=1997"
                  />
                  <button
                    className="main-button visible"
                    onClick={handleClickSearch}
                  >
                    <SearchOutlined fontSize="small" />
                    <span>Search</span>
                  </button>
                </div>
                <div className="card__body-container--item">
                  <div className="book-list__search-results">
                    {status === "loading" ? (
                      <div>Loading...</div>
                    ) : status === "rejected" ? (
                      <div>{error}</div>
                    ) : (
                      <div className="table-card">
                        <table className="books_table">
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
                                      backgroundImage: `url(${book?.cover_url})`,
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
                                    {book?.genres?.map((genre) => (
                                      <div className="table__row-item--content-inner">
                                        <span key={genre.genre_id}>
                                          {genre.genre_name}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="table__row-item">
                                  <div className="table__row-item--content">
                                    {book.authors.map((author) => (
                                      <div className="table__row-item--content-inner">
                                        <span key={author.author_id}>
                                          {author.full_name}
                                        </span>
                                      </div>
                                    ))}
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
                                          navigate(
                                            `/dashboard/books/edit-book/${book.book_id}`
                                          )
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
                    )}
                  </div>
                </div>
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
    </div>
  );
};

export default BookList;

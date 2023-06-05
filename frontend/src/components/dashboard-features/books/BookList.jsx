import { useNavigate } from "react-router-dom";
import { ModeEdit, Add, Edit } from "@mui/icons-material";

import "./bookStyles.css";

const BookList = () => {
  const navigate = useNavigate();

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
                <div
                  className="book-cover"
                  style={{
                    backgroundImage:
                      "url(https://i.pinimg.com/originals/d0/0a/20/d00a20365c0303a5e4b450ed8b334587.jpg)",
                  }}
                ></div>
                <table className="table">
                  <thead className="table__header">
                    <tr>
                      <th className="table__header-item">
                        <div className="table__header-item--content">Title</div>
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
                    <tr className="table__row odd">
                      <td className="table__row-item">
                        <div className="table__row-item--content">
                          <div className="table__row-item--content-inner">
                            Harry Potter
                          </div>
                        </div>
                      </td>
                      <td className="table__row-item">
                        <div className="table__row-item--content">
                          <div className="table__row-item--content-inner">
                            Fantasy
                          </div>
                        </div>
                      </td>
                      <td className="table__row-item">
                        <div className="table__row-item--content">
                          <div className="table__row-item--content-inner">
                            J. K. Rowling
                          </div>
                        </div>
                      </td>
                      <td className="table__row-item">
                        <div className="table__row-item--content">
                          <div className="table__row-item--content-inner">
                            Bloomsbury
                          </div>
                        </div>
                      </td>
                      <td className="table__row-item">
                        <div className="table__row-item--content">
                          <div className="table__row-item--content-inner">
                            1997
                          </div>
                        </div>
                      </td>
                      <td className="table__row-item">
                        <div className="table__row-item--content">
                          <div className="table__row-item--content-inner">
                            123
                          </div>
                        </div>
                      </td>
                      <td className="table__row-item">
                        <div className="table__row-item--content">
                          <div className="table__row-item--content-inner">
                            5
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;

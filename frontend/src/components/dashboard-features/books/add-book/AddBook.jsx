import { useState, useRef, useEffect } from "react";
import {
  Add,
  AddPhotoAlternate,
  Check,
  Clear,
  Edit,
} from "@mui/icons-material";

import Input from "../../../custom-elements/input/Input";
import "./addBook.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputLabel, setInputLabel] = useState("");
  const [inputContent, setInputContent] = useState({ value: "", index: null });

  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const handleClickAddEditItem = (value, name, index) => {
    setInputContent({ value, index });

    setInputLabel(name);
    setIsInputVisible(true);
  };

  const handleClickCancelItem = () => {
    setInputContent({ value: "", index: null });
    setIsInputVisible(false);
  };

  const handleChangeInput = (e) => {
    setInputContent((prevContent) => {
      if (inputLabel === "Release year") {
        if (typeof e.target.value !== Number && e.target.value !== "") {
          setError(true);
        } else {
          setError(false);
        }
      }
      return {
        value: e.target.value,
        index: prevContent.index,
      };
    });
  };

  const handleClickConfirmItem = () => {
    switch (inputLabel) {
      case "Title":
        setTitle(inputContent.value);
        break;
      case "Genre":
        setGenres((prevGenres) => {
          const updatedGenres = [...prevGenres];
          if (inputContent.index !== undefined) {
            updatedGenres[inputContent.index] = inputContent.value;
          } else {
            updatedGenres.push(inputContent.value);
          }
          return updatedGenres;
        });
        break;
      case "Author":
        setAuthors((prevAuthors) => {
          const updatedAuthors = [...prevAuthors];
          if (inputContent.index !== undefined) {
            updatedAuthors[inputContent.index] = inputContent.value;
          } else {
            updatedAuthors.push(inputContent.value);
          }
          return updatedAuthors;
        });
        break;
      case "Publisher":
        setPublisher(inputContent.value);
        break;
      case "Release year":
        setReleaseYear(inputContent.value);
        break;
      default:
        break;
    }

    setInputContent({ value: "", index: null });
    setIsInputVisible(false);
  };

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

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
                <div className="dash-book-card">
                  <button className="add-book-cover">
                    <AddPhotoAlternate />
                  </button>
                  <table className="table">
                    <thead className="table__header">
                      <tr>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Title</span>
                            <button
                              className={`main-button ${!title && "visible"}`}
                              disabled={title}
                              onClick={() =>
                                handleClickAddEditItem(title, "Title")
                              }
                            >
                              <Add fontSize="small" />
                              <span> Add</span>
                            </button>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Genres</span>
                            <button
                              className="main-button visible"
                              onClick={() =>
                                handleClickAddEditItem(
                                  "",
                                  "Genre",
                                  genres.length
                                )
                              }
                            >
                              <Add fontSize="small" />
                              <span> Add</span>
                            </button>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Authors</span>
                            <button
                              className="main-button visible"
                              onClick={() =>
                                handleClickAddEditItem(
                                  "",
                                  "Author",
                                  authors.length
                                )
                              }
                            >
                              <Add fontSize="small" />
                              <span> Add</span>
                            </button>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Publisher</span>
                            <button
                              className={`main-button ${
                                !publisher && "visible"
                              }`}
                              disabled={publisher}
                              onClick={() =>
                                handleClickAddEditItem("", "Publisher")
                              }
                            >
                              <Add fontSize="small" />
                              <span> Add</span>
                            </button>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Release year</span>
                            <button
                              className={`main-button ${
                                !releaseYear && "visible"
                              }`}
                              disabled={releaseYear}
                              onClick={() =>
                                handleClickAddEditItem("", "Release year")
                              }
                            >
                              <Add fontSize="small" />
                              <span> Add</span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table__body">
                      <tr className="table__row">
                        <td className="table__row-item">
                          <div className="table__row-item--content">
                            {title && (
                              <div className="table__row-item--content-inner">
                                <span>{title}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddEditItem(title, "Title")
                                  }
                                >
                                  <Edit fontSize="small" />
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="table__row-item">
                          <div className="table__row-item--content">
                            {genres.map((genre, index) => (
                              <div
                                key={index}
                                className="table__row-item--content-inner"
                              >
                                <span>{genre}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddEditItem(
                                      genre,
                                      "Genre",
                                      index
                                    )
                                  }
                                >
                                  <Edit fontSize="small" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="table__row-item">
                          <div className="table__row-item--content">
                            {authors.map((author, index) => (
                              <div
                                key={index}
                                className="table__row-item--content-inner"
                              >
                                <span>{author}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddEditItem(
                                      author,
                                      "Author",
                                      index
                                    )
                                  }
                                >
                                  <Edit fontSize="small" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="table__row-item">
                          <div className="table__row-item--content">
                            {publisher && (
                              <div className="table__row-item--content-inner">
                                <span>{publisher}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddEditItem(
                                      publisher,
                                      "Publisher"
                                    )
                                  }
                                >
                                  <Edit fontSize="small" />
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="table__row-item">
                          {releaseYear && (
                            <div className="table__row-item--content-inner">
                              <span>{releaseYear}</span>
                              <button
                                className="main-button visible"
                                onClick={() =>
                                  handleClickAddEditItem(
                                    releaseYear,
                                    "Release year"
                                  )
                                }
                              >
                                <Edit fontSize="small" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card__body-container--item">
                <div className="card__body-buttons">
                  <Input
                    value={inputContent.value}
                    label={inputLabel}
                    visibility={isInputVisible}
                    disabled={!isInputVisible}
                    ref={inputRef}
                    onChange={(e) => handleChangeInput(e)}
                  />

                  <button
                    className={`main-button ${isInputVisible && "visible"}`}
                    disabled={!isInputVisible}
                    style={{ marginLeft: "5px" }}
                    onClick={handleClickCancelItem}
                  >
                    <Clear fontSize="small" />
                    <span>Cancel</span>
                  </button>
                  <button
                    className={`main-button ${
                      inputContent.value && isInputVisible && "visible"
                    }`}
                    disabled={!inputContent.value || !isInputVisible || error}
                    style={{ marginLeft: "5px" }}
                    onClick={handleClickConfirmItem}
                  >
                    <Check fontSize="small" />
                    <span>Confirm</span>
                  </button>
                </div>

                <div className="card__body-buttons">
                  <button className="main-button visible">
                    <Add />
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card__body-container">
              <div className="check-book">
                <h4>Check book for uniqueness</h4>
                <Input
                  visibility={true}
                  placeholder="Example: title=Harry Potter, releaseYear=1997"
                />
                <div className="check-book__search-results">
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
                          <th className="table__header-item">Title</th>
                          <th className="table__header-item">Genres</th>
                          <th className="table__header-item">Authors</th>
                          <th className="table__header-item">Publisher</th>
                          <th className="table__header-item">Release year</th>
                        </thead>
                        <tbody className="table__body">
                          <tr className="table__row odd">
                            <td className="table__row-item">Harry Potter</td>
                            <td className="table__row-item">Fantasy</td>
                            <td className="table__row-item">J. K. Rowling</td>
                            <td className="table__row-item">Bloomsbury</td>
                            <td className="table__row-item">1997</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

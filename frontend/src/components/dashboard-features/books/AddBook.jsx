import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Add,
  AddPhotoAlternate,
  Check,
  Clear,
  Edit,
  DeleteOutline,
} from "@mui/icons-material";

import "./bookStyles.css";
import { addBook } from "../../../store/bookSlice";
import Input from "../../custom-elements/input/Input";

const AddBook = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [pagesCount, setPagesCount] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputLabel, setInputLabel] = useState("");
  const [inputContent, setInputContent] = useState({ value: "", index: null });

  const [inputError, setInputError] = useState(false);
  const inputRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleClickAddEditItem = (value, name, index) => {
    setInputContent({ value, index });
    setInputLabel(name);
    setIsInputVisible(true);
  };

  const handleClickCancelItem = () => {
    setInputContent({ value: "", index: null });
    setIsInputVisible(false);
  };

  const handleClickDeleteItem = () => {
    switch (inputLabel) {
      case "Genre":
        setGenres((prevGenres) => {
          const updatedGenres = [...prevGenres];
          updatedGenres.splice(inputContent.index, 1);
          return updatedGenres;
        });
        break;
      case "Author":
        setAuthors((prevAuthors) => {
          const updatedAuthors = [...prevAuthors];
          updatedAuthors.splice(inputContent.index, 1);
          return updatedAuthors;
        });
        break;
      default:
        break;
    }
    setInputContent({ value: "", index: null });
    setIsInputVisible(false);
  };

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChangeInput = (e) => {
    setInputContent((prevContent) => {
      if (
        inputLabel === "Release year" ||
        inputLabel === "Pages count" ||
        inputLabel === "Quantity"
      ) {
        const isValidInput = /^\d+$/.test(e.target.value);
        setInputError(!isValidInput);
      }
      if (inputLabel === "Genre") {
        const isValidGenre = /^[a-zA-Z]+$/.test(e.target.value);
        setInputError(!isValidGenre);
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
      case "Pages count":
        setPagesCount(inputContent.value);
        break;
      case "Quantity":
        setQuantity(inputContent.value);
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

  const handleClickSubmit = async () => {
    try {
      await dispatch(
        addBook({
          writing: title,
          genres,
          authors,
          publisher,
          releaseYear,
          pagesCount,
          quantity,
        })
      ).unwrap();
      setTitle("");
      setGenres([]);
      setAuthors([]);
      setPublisher("");
      setReleaseYear("");
      setPagesCount("");
      setQuantity("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">Books</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__header">
            <h3 className="card__header-title">Add book</h3>
          </div>
          <div className="card__body">
            <div className="card__body-container">
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
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Pages count</span>
                            <button
                              className={`main-button ${
                                !pagesCount && "visible"
                              }`}
                              disabled={pagesCount}
                              onClick={() =>
                                handleClickAddEditItem("", "Pages count")
                              }
                            >
                              <Add fontSize="small" />
                              <span> Add</span>
                            </button>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Quantity</span>
                            <button
                              className={`main-button ${
                                !quantity && "visible"
                              }`}
                              disabled={quantity}
                              onClick={() =>
                                handleClickAddEditItem("", "Quantity")
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
                          <button className="add-book-cover">
                            <AddPhotoAlternate />
                          </button>
                        </td>

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
                        <td className="table__row-item">
                          {pagesCount && (
                            <div className="table__row-item--content-inner">
                              <span>{pagesCount}</span>
                              <button
                                className="main-button visible"
                                onClick={() =>
                                  handleClickAddEditItem(
                                    pagesCount,
                                    "Pages count"
                                  )
                                }
                              >
                                <Edit fontSize="small" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="table__row-item">
                          {quantity && (
                            <div className="table__row-item--content-inner">
                              <span>{quantity}</span>
                              <button
                                className="main-button visible"
                                onClick={() =>
                                  handleClickAddEditItem(quantity, "Quantity")
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
                  {isInputVisible &&
                    ((inputLabel === "Genre" && genres.length > 1) ||
                      (inputLabel === "Author" && authors.length > 1)) && (
                      <button
                        className="link-button cancel visible"
                        disabled={!isInputVisible}
                        onClick={handleClickDeleteItem}
                      >
                        <DeleteOutline fontSize="small" />
                      </button>
                    )}

                  <button
                    className={`main-button ${isInputVisible && "visible"}`}
                    disabled={!isInputVisible}
                    onClick={handleClickCancelItem}
                  >
                    <Clear fontSize="small" />
                    <span>Cancel</span>
                  </button>
                  <button
                    className={`main-button ${
                      inputContent.value && isInputVisible && "visible"
                    }`}
                    disabled={
                      !inputContent.value || !isInputVisible || inputError
                    }
                    onClick={handleClickConfirmItem}
                  >
                    <Check fontSize="small" />
                    <span>Add new</span>
                  </button>
                  {/* {inputLabel === "Author" && inputContent.value && (
                    <div className="check-box-container">
                      <label className="check-box-label">
                        <input
                          type="checkbox"
                          className="check-box-input"
                          checked={isChecked}
                          onChange={handleRadioChange}
                        />
                        New
                      </label>
                    </div>
                  )} */}
                </div>

                <div className="card__body-buttons">
                  <button
                    className="main-button visible"
                    disabled={
                      !title ||
                      genres.length < 1 ||
                      authors.length < 1 ||
                      !publisher ||
                      !releaseYear ||
                      !pagesCount ||
                      !quantity
                    }
                    onClick={handleClickSubmit}
                  >
                    <Add />
                    <h4>Submit</h4>
                  </button>
                </div>
              </div>
            </div>
            <div className="card__body-container--item">
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
                        <table className="table">
                          <thead className="table__header">
                            <tr>
                              <th className="table__header-item">
                                <div className="table__header-item--content">
                                  Cover
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
                            </tr>
                          </thead>
                          <tbody className="table__body">
                            <tr className="table__row odd">
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
    </div>
  );
};

export default AddBook;

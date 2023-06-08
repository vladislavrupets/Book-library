import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Add,
  AddPhotoAlternate,
  Check,
  SearchOutlined,
  QuestionMark,
  Edit,
  DeleteOutline,
} from "@mui/icons-material";

import "./bookStyles.css";
import { addBook, searchBooks } from "../../../store/bookSlice";
import Input from "../../custom-elements/input/Input";

const AddBook = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.book);

  const [cover, setCover] = useState("");
  const [writing, setWriting] = useState({
    title: "",
    writing_id: "",
  });
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

  const [inputSearchContent, setInputSearchContent] = useState("");
  const [isManulSerching, setIsManulSerching] = useState(true);
  const [isCheckedField, setIsCheckedField] = useState(false);

  const handleClickAddNewEditItem = (value, name, index) => {
    setInputContent({ value, index });
    setInputLabel(name);
    setIsInputVisible(true);
    setIsCheckedField(false);
  };

  const handleClickAddExistItem = (value, name, id) => {
    if (name === "Title") {
      setWriting({ title: value, writing_id: id });
    }
    if (name === "Authors") {
      setAuthors((prevAuthors) => {
        const updatedAuthors = [...prevAuthors];
        updatedAuthors.push({ full_name: value, author_id: id });
        return updatedAuthors;
      });
    }
    setInputContent({ value: "", index: null });
    setIsInputVisible(false);
  };

  const handleClickSearch = () => {
    dispatch(searchBooks(inputSearchContent));
  };

  const handleClickCheckItem = () => {
    setInputSearchContent(`${inputLabel.toLowerCase()}=${inputContent.value};`);
    setIsCheckedField(true);
    setIsManulSerching(false);
  };

  useEffect(() => {
    if (!isManulSerching && inputContent) {
      handleClickSearch();
      setIsManulSerching(true);
    }
  }, [inputSearchContent]);

  const handleClickDeleteItem = () => {
    switch (inputLabel) {
      case "Genres":
        setGenres((prevGenres) => {
          const updatedGenres = [...prevGenres];
          updatedGenres.splice(inputContent.index, 1);
          return updatedGenres;
        });
        break;
      case "Authors":
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

  const handleChangeInput = (e) => {
    setIsCheckedField(false);
    setInputContent((prevContent) => {
      if (
        inputLabel === "Release year" ||
        inputLabel === "Pages count" ||
        inputLabel === "Quantity"
      ) {
        setIsCheckedField(true);
        const isValidInput = /^\d+$/.test(e.target.value);
        setInputError(!isValidInput);
      }
      if (inputLabel === "Genres") {
        setIsCheckedField(true);
        const isValidGenre = /^[a-zA-Zа-яА-Я\s]+$/.test(e.target.value);
        setInputError(!isValidGenre);
      }
      if (inputLabel === "Publisher") {
        setIsCheckedField(true);
      }
      if (inputLabel === "Cover") {
        setIsCheckedField(true);
        const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value);
        setInputError(!isValidUrl);
      }
      return {
        value: e.target.value,
        index: prevContent.index,
      };
    });
  };

  const handleClickConfirmItem = () => {
    switch (inputLabel) {
      case "Cover":
        setCover(inputContent.value);
        break;
      case "Title":
        setWriting({ title: inputContent.value });
        break;
      case "Genres":
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
      case "Authors":
        setAuthors((prevAuthors) => {
          const updatedAuthors = [...prevAuthors];
          if (inputContent.index !== undefined) {
            updatedAuthors[inputContent.index] = {
              full_name: inputContent.value,
            };
          } else {
            updatedAuthors.push({ full_name: inputContent.value });
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
          writing,
          genres,
          authors,
          publisher,
          releaseYear,
          pagesCount,
          quantity,
          coverUrl: cover,
        })
      ).unwrap();
      setWriting("");
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
                            <span className="book-cover__span">Cover</span>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Title</span>
                            <button
                              className={`main-button ${
                                !writing.title && "visible"
                              }`}
                              disabled={writing.title}
                              onClick={() =>
                                handleClickAddNewEditItem("", "Title")
                              }
                            >
                              <Add fontSize="small" />
                              <span>Add</span>
                            </button>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Genres</span>
                            <button
                              className="main-button visible"
                              onClick={() =>
                                handleClickAddNewEditItem(
                                  "",
                                  "Genres",
                                  genres.length
                                )
                              }
                            >
                              <Add fontSize="small" />
                              <span>Add</span>
                            </button>
                          </div>
                        </th>
                        <th className="table__header-item">
                          <div className="table__header-item--content">
                            <span>Authors</span>
                            <button
                              className="main-button visible"
                              onClick={() =>
                                handleClickAddNewEditItem(
                                  "",
                                  "Authors",
                                  authors.length
                                )
                              }
                            >
                              <Add fontSize="small" />
                              <span>Add</span>
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
                                handleClickAddNewEditItem("", "Publisher")
                              }
                            >
                              <Add fontSize="small" />
                              <span>Add</span>
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
                                handleClickAddNewEditItem("", "Release year")
                              }
                            >
                              <Add fontSize="small" />
                              <span>Add</span>
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
                                handleClickAddNewEditItem("", "Pages count")
                              }
                            >
                              <Add fontSize="small" />
                              <span>Add</span>
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
                                handleClickAddNewEditItem("", "Quantity")
                              }
                            >
                              <Add fontSize="small" />
                              <span>Add</span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table__body">
                      <tr className="table__row">
                        <td className="table__row-item">
                          <button
                            className="add-book-cover"
                            style={{
                              backgroundImage: `url(${cover})`,
                            }}
                            onClick={() =>
                              handleClickAddNewEditItem("", "Cover")
                            }
                          >
                            <AddPhotoAlternate />
                          </button>
                        </td>

                        <td className="table__row-item">
                          <div className="table__row-item--content">
                            {writing.title && (
                              <div className="table__row-item--content-inner">
                                <span>{writing.title}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddNewEditItem(
                                      writing.title,
                                      "Title"
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
                                    handleClickAddNewEditItem(
                                      genre,
                                      "Genres",
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
                                <span>{author.full_name}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddNewEditItem(
                                      author.full_name,
                                      "Authors",
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
                                    handleClickAddNewEditItem(
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
                          <div className="table__row-item--content">
                            {releaseYear && (
                              <div className="table__row-item--content-inner">
                                <span>{releaseYear}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddNewEditItem(
                                      releaseYear,
                                      "Release year"
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
                          <div className="table__row-item--content">
                            {pagesCount && (
                              <div className="table__row-item--content-inner">
                                <span>{pagesCount}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddNewEditItem(
                                      pagesCount,
                                      "Pages count"
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
                          <div className="table__row-item--content">
                            {quantity && (
                              <div className="table__row-item--content-inner">
                                <span>{quantity}</span>
                                <button
                                  className="main-button visible"
                                  onClick={() =>
                                    handleClickAddNewEditItem(
                                      quantity,
                                      "Quantity"
                                    )
                                  }
                                >
                                  <Edit fontSize="small" />
                                </button>
                              </div>
                            )}
                          </div>
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
                    ((inputLabel === "Genres" && genres.length > 1) ||
                      (inputLabel === "Authors" && authors.length > 1)) && (
                      <button
                        className="link-button cancel visible"
                        disabled={!isInputVisible}
                        onClick={handleClickDeleteItem}
                      >
                        <DeleteOutline fontSize="small" />
                      </button>
                    )}
                  {!isCheckedField &&
                    (inputLabel === "Title" || inputLabel === "Authors") && (
                      <button
                        className={`main-button ${isInputVisible && "visible"}`}
                        disabled={!isInputVisible}
                        onClick={handleClickCheckItem}
                      >
                        <QuestionMark fontSize="small" />
                        <span>Check</span>
                      </button>
                    )}

                  <button
                    className={`main-button ${
                      inputContent.value &&
                      isInputVisible &&
                      isCheckedField &&
                      "visible"
                    }`}
                    disabled={
                      !inputContent.value ||
                      !isInputVisible ||
                      inputError ||
                      !isCheckedField
                    }
                    onClick={handleClickConfirmItem}
                  >
                    <Check fontSize="small" />
                    {inputLabel === "Title" || inputLabel === "Authors" ? (
                      <span>Add new</span>
                    ) : (
                      <span> Add</span>
                    )}
                  </button>
                </div>

                <div className="card__body-buttons">
                  <button
                    className="main-button visible"
                    disabled={
                      !writing ||
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
                            {books?.map((book) => (
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
                                      {book?.writing?.title}
                                      <button
                                        className={`main-button ${
                                          inputLabel === "Title" && "visible"
                                        }`}
                                        disabled={inputLabel !== "Title"}
                                        onClick={() => {
                                          handleClickAddExistItem(
                                            book?.writing?.title,
                                            "Title",
                                            book?.writing.writing_id
                                          );
                                        }}
                                      >
                                        <Add fontSize="small" />
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="table__row-item">
                                  <div className="table__row-item--content">
                                    {book?.genres?.map((genre) => (
                                      <div className="table__row-item--content-inner">
                                        <span key={genre?.genre_id}>
                                          {genre?.genre_name}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="table__row-item">
                                  <div className="table__row-item--content">
                                    {book?.authors.map((author) => (
                                      <div className="table__row-item--content-inner">
                                        <span key={author?.author_id}>
                                          {author?.full_name}
                                        </span>
                                        <button
                                          className={`main-button ${
                                            inputLabel === "Authors" &&
                                            "visible"
                                          }`}
                                          disabled={inputLabel !== "Authors"}
                                          onClick={() =>
                                            handleClickAddExistItem(
                                              author.full_name,
                                              "Authors",
                                              author.author_id
                                            )
                                          }
                                        >
                                          <Add fontSize="small" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="table__row-item">
                                  <div className="table__row-item--content">
                                    <div className="table__row-item--content-inner">
                                      {book?.publisher?.publisher_name}
                                    </div>
                                  </div>
                                </td>
                                <td className="table__row-item">
                                  <div className="table__row-item--content">
                                    <div className="table__row-item--content-inner">
                                      {book?.release_year}
                                    </div>
                                  </div>
                                </td>
                                <td className="table__row-item">
                                  <div className="table__row-item--content">
                                    <div className="table__row-item--content-inner">
                                      {book?.pages_count}
                                    </div>
                                  </div>
                                </td>
                                <td className="table__row-item">
                                  <div className="table__row-item--content">
                                    <div className="table__row-item--content-inner">
                                      {book?.quantity}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

import { useState } from "react";
import { Add } from "@mui/icons-material";

import Input from "../../../custom-elements/input/Input";
import "./addBook.css";

const AddBook = () => {
  const [authors, setAuthors] = useState([]);
  const [authorInputVisible, setAuthorInputVisible] = useState(false);
  const [authorName, setAuthorName] = useState("");

  const [genres, setGenres] = useState([]);
  const [genreInputVisible, setGenreInputVisible] = useState(false);
  const [genreName, setGenreName] = useState("");

  const handleAddItem = (addItemFunction, setInputVisibleFunction) => {
    setInputVisibleFunction(true);
  };

  const handleItemNameChange = (e, setNameFunction) => {
    setNameFunction(e.target.value);
  };

  const handleConfirmItem = (
    itemName,
    setItemsFunction,
    setNameFunction,
    setInputVisibleFunction
  ) => {
    if (itemName !== "") {
      setItemsFunction((prevItems) => [...prevItems, itemName]);
      setNameFunction("");
      setInputVisibleFunction(false);
    }
  };

  const handleRemoveItem = (index, items, setItemsFunction) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItemsFunction(updatedItems);
  };

  return (
    <div className="content-container">
      {/* <div className="content-container__header">
        <h2 className="content-container__header-title">Books</h2>
      </div> */}
      <div className="content-container__item">
        <div className="card">
          <div className="card__header">
            <h3 className="card__header-title">Add book</h3>
          </div>
          <div className="card__body">
            <div className="card__body-container">
              <div className="card__body-container--item">
                <div className="add-book-cover"></div>
                <table className="table">
                  <thead className="table__header">
                    <th className="table__header-item">Writing</th>
                    <th className="table__header-item">Genres</th>
                    <th className="table__header-item">Authors</th>
                    <th className="table__header-item">Publisher</th>
                    <th className="table__header-item">Release year</th>
                  </thead>
                  <tbody className="table__body">
                    <tr className="table__row odd">
                      <td className="table__row-item">
                        <Input />
                      </td>
                      <td className="table__row-item">
                        <Input />
                      </td>
                      <td className="table__row-item">
                        <Input />
                      </td>
                      <td className="table__row-item">
                        <Input />
                      </td>
                      <td className="table__row-item">
                        <Input />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card__body-container">
              <div className="check-book">
                <h4>Check book for uniqueness</h4>
                <Input />
                <div className="check-book__search-results">
                  <div className="card__body-container--item">
                    <div className="add-book-cover"></div>
                    <table className="table">
                      <thead className="table__header">
                        <th className="table__header-item">Writing</th>
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
                  <div className="card__body-container--item">
                    <div className="add-book-cover"></div>
                    <table className="table">
                      <thead className="table__header">
                        <th className="table__header-item">Writing</th>
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
                  <div className="card__body-container--item">
                    <div className="add-book-cover"></div>
                    <table className="table">
                      <thead className="table__header">
                        <th className="table__header-item">Writing</th>
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
                  <div className="card__body-container--item">
                    <div className="add-book-cover"></div>
                    <table className="table">
                      <thead className="table__header">
                        <th className="table__header-item">Writing</th>
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
  );
};

export default AddBook;

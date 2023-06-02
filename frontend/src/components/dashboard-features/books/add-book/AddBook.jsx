import React from "react";
import { Add } from "@mui/icons-material";

import Input from "../../../custom-elements/input/Input";
import "./addBook.css";

const AddBook = () => {
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
            <div className="card__body-item-container">
              <div className="add-book-cover"></div>
              <div className="card__body-item">
                <Input />
              </div>
              <div className="card__body-item">
                <Input />
              </div>
              <div className="card__body-item">
                <Input />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

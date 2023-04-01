import React from "react";

import "./addBook.css";
import Input from "../../../../custom-elements/input/Input";

const AddBook = () => {
  return (
    <div className="content-container">
      <div className="content-container__item">
        <Input label={"Test"} />
      </div>
      <div className="content-container__item">Books</div>
    </div>
  );
};

export default AddBook;

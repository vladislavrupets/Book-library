import React from "react";
import { Add } from "@mui/icons-material";

import "./addBook.css";
import Input from "../../../../custom-elements/input/Input";
import Card from "../../../../custom-elements/text-card/Card";

const AddBook = () => {
  return (
    <div className="content-container">
      <div className="content-container__item">
        <h3>Add/edit book</h3>
      </div>
      <div className="content-container__item">
        <div className="add-book-cover">Add book cover</div>
        <div className="add-book-container">
          <div className="add-book-container__item">
            <h3>Title: </h3>
            <Card>111</Card>
          </div>
          <div className="add-book-container__item">
            <h3>Authors: </h3>
            <Card>111</Card>
          </div>
          <div className="add-book-container__item">
            <h3>Genres: </h3>
            <Card>111</Card>
          </div>
          <div className="add-book-container__item">
            <h3>Publisher: </h3>
            <Card>111</Card>
          </div>
          <div className="add-book-container__item">
            <h3>Pages: </h3>
            <Card>111</Card>
          </div>
          <div className="add-book-container__item">
            <h3>Release year: </h3>
            <Card>111</Card>
          </div>
        </div>
        <div className="book-existence-container"></div>
      </div>
    </div>
  );
};

export default AddBook;

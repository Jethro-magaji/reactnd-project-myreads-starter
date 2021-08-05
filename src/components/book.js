import React from "react";
import PropTypes from "prop-types";
import { BookShelves } from "../App";
import { Component } from "react";

class Book extends Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                this.props.book.imageLinks &&
                this.props.book.imageLinks.thumbnail
                  ? `url(${this.props.book.imageLinks.thumbnail})`
                  : "none"
            }}
          />{" "}
          <div className="book-shelf-changer">
            <select
              value={this.props.shelfValue}
              onChange={e => {
                this.props.updateShelf(this.props.book, e.target.value);
                alert(
                  `You have successfully added  ${
                    this.props.book.title
                  } to the shelf`
                );
              }}
            >
              <optgroup label="Move to...">
                {" "}
                {BookShelves.map((option, idx) => {
                  return (
                    <option key={`${option.label}idx`} value={option.value}>
                      {" "}
                      {option.label}{" "}
                    </option>
                  );
                })}{" "}
              </optgroup>{" "}
            </select>{" "}
          </div>{" "}
        </div>{" "}
        <div className="book-title"> {this.props.book.title} </div>{" "}
        <div className="book-authors">
          {" "}
          {this.props.book.authors &&
            this.props.book.authors.map(author => {
              return author;
            })}{" "}
        </div>{" "}
      </div>
    );
  }
}

Book.propTypes = {
  shelfValue: PropTypes.string,
  updateShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
};

export default Book;

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//import { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Shelf from "./components/shelf.js";
import Search from "./components/search.js";

export const BookShelves = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "currentlyReading",
    label: "Currently Reading",
  },
  {
    value: "wantToRead",
    label: "Want To Read",
  },
  {
    value: "Read",
    label: "Read",
  },  
];


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      books: [],
  }};

  getAllBooks() {
    BooksAPI.getAll().then((response) => {
      this.setState({ books: response });
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks();
    });
  };

  render() {
    return (
      <Router>
        <div className="app">
        <Switch>
          <Route exact path="/search">
            <Search books={this.state.books} updateShelf={this.updateShelf}/>
          </Route>
          <Route exact path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {BookShelves.map((shelf) => {
                    if (shelf.value === "none") {
                      return "";
                    }
                    return (
                      <Shelf
                        key={shelf.value}
                        shelf={shelf}
                        updateShelf={this.updateShelf}
                        books={this.state.books.filter(
                          (book) => book.shelf === shelf.value
                        )}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp

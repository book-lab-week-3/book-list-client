'use strict';

var app = app || {};

(function(module) {
  function errorCallback(err) {
    console.error(err)
    module.errorView.initErrorPage(err);
  }

  function Book(bookObj) {
    Object.keys(bookObj).forEach(key => this[key] = bookObj[key]);
  }

  Book.prototype.toHtml = function() {
    return app.render('#book-list-template', this);
  };

  Book.all = [];

  // puts one book in Book.all when details for one book are selected :id
  Book.loadOne = rows =>
    Book.all = rows.map(book => new Book(book));

  // puts all books in db into book.all
  Book.loadAll = rows =>
    Book.all = rows.sort((a, b) =>
      b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books/:id`)
      .then(Book.loadOne)
      .then(callback)
      .catch(errorCallback);

  Book.prototype.createBook = function(callback) {
    $.post('/api/v1/books', {author: this.author, title: this.title, image_url: this.image_url, isbn: this.isbn, description: this.description})
      .then(console.log)
      .then(callback);
  }

  module.Book = Book;
})(app)
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

  Book.loadAll = rows =>
    Book.all = rows.sort((a, b) =>
      b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  module.Book = Book;
})(app)
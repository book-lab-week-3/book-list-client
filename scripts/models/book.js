'use strict';

var app = app || {};

(function(module) {
  function errorCallback(err) {
    console.error(err)
    module.errorView.initErrorPage(err);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function() {
    return app.render('book-list-template', this);
  }

  Book.all = [];

  Book.loadAll = rows => {
    rows.sort((a, b) => {
      a.title - b.title;
    });

    Book.all = rows.map(rawBookObj => new Book(rawBookObj));

  };

  Book.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  module.Book = Book;
})(app)
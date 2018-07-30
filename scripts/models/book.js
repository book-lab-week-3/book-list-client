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

  Book.prototype.toHtml = function(templateId) {
    return app.render(templateId, this);
  }

  Book.all = [];

  // puts one book in Book.all when details for one book are selected :id
  // Book.loadOne = rows =>
  //   Book.all = rows.map(book => new Book(book));

  // puts all books in db into book.all
  Book.loadAll = rows =>
    Book.all = rows.sort((a, b) =>
      b.title - a.title).map(book => new Book(book));

  Book.fetchAll = (callback) =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = (context, callback) =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books/${context.params.id}`)
      .then(results => { context.book = results[0];
        console.log(context);
        return context})
      .then((context) => callback(context))
      .catch(errorCallback);

  Book.createBook = function(book) {
    $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/books`, book)
      .then(console.log)
      .then(() => page('/'))
  }

  module.Book = Book;
})(app)
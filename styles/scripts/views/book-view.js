'use strict';

(function(module) {
  const bookView = {};

  bookView.initIndexPage = context => {
    app.hide('.container');
    app.show('.book-view');

    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }


})(app)
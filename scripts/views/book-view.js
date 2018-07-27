'use strict';

var app = app || {};

(function(module) {
  const bookView = {};

  bookView.initIndexPage = () => {
    $('#book-list').empty();
    app.showOnly('.book-view');
    $(`.error-view`).hide();
    $(`.detail-view`).hide();
    $(`.form-view`).hide();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initDetailPage = (context) => {
    $('book-detail').empty();
    app.showOnly('.detail-view');
    $(`.error-view`).hide();
    $('#book-detail').append(app.render('book-detail-template', context.book))
  }

  bookView.initFormPage = () => {
    app.showOnly('.form-view');
    $(`.error-view`).hide();
    $(`.detail-view`).hide();
    $(`.book-view`).hide();
    $('new-book-form').on('submit', (e) => { e.preventDefault();
      let book = {
        author: event.target.author.value,
        title: event.target.title.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.createBook(book);
    })
  }

  bookView.initErrorPage = err => {
    app.showOnly('.error-view')
    $('#error-message').empty();
    $('#error-message').append(app.render('error-template', err));
  }

  module.bookView = bookView;
})(app)

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})

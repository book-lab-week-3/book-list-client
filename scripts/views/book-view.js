'use strict';

var app = app || {};

(function(module) {
  const bookView = {};

  bookView.initIndexPage = () => {
    app.showOnly('.book-view');
    $(`.error-view`).hide();
    $(`.detail-view`).hide();
    $(`.form-view`).hide();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initDetailPage = (context) => {
    app.showOnly('.form-view');
    console.log(context);
    $(`.error-view`).hide();
    $('body').css('background-color', '#ddd');
    module.Book.all.map(book => $('#book-detail').append(book.toHtml()));
  }

  bookView.initFormPage = (context) => {
    app.showOnly('.form-view');
    $(`.error-view`).hide();
    $(`.detail-view`).hide();
    $(`.book-view`).hide();
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

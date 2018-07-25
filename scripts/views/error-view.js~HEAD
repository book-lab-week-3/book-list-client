'use strict';

var app = app || {};

(function(module) {
  const errorView = {};
  errorView.initErrorPage = err => {
    app.hide('.container')
    app.show('.error-view')
    $('#error-message').empty();
    $('#error-message').append(app.render('error-template', err));
  }

  module.errorView = errorView;
})(app)
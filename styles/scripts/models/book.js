'use strict';


(function(module) {
  function errorCallback(err) {
  console.error(err)
  module.errorView.initErrorPage(err);
}

function Book(rawBookObj) {
  Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
}

Book.prototype.toHtml = function() {
  let template = Handlebars.compile($('#book-list-template'.text()));
  return app.render();
}

Book.all[];
Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title)

Book.fetchAll = callback =>
  $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
    .then();
    .then();
    .catch(errorCallback);

  module.Book = Book;
  })(app)
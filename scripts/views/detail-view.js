'use strict';

var app = app || {};

(function(module) {
  const detailView = {};

  detailView.initDetailPage = () => {
    app.showOnly('.detail-view');
    $(`.error-view`).hide();
    module.Book.all.map(book => $('#book-detail').append(book.toHtml()));
  }

  module.detailView = detailView;
})(app)

$('p').on('click', console.log('clicked'));


'use strict';

page('/', context => app.Book.fetchAll(app.bookView.initIndexPage()));
page('/books/:id', context => app.Book.fetchOne(context, app.bookView.initDetailPage));
page('/books/new', context => app.bookView.initFormPage(context));

page();
const express = require('express');

//import our modular routers for relative files
const notesRouter = require('./notes');
const apiRouter = require('./api');

const app = express();

app.use('/', notesRouter);
app.use('/api/notes', apiRouter);

module.exports = app;

const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3001;

//import custom middleware, "clog"
app.use(clog);

//middleware for paring JSON and urlencoded form data
app.use(express.urlencoded({ extended: true}));//for parsing application/json
app.use(express.json());
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (rq, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/404.html'))
});

app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
);

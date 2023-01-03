const express = require('express');

const app = express();

const userNotes = require('../../../db/db.json');

const PORT = 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '02-Challenge/Develop/public/notes.html'))
});

app.get('*', (req, res) =>{
    res.send('02-Challenge/Develop/public/index.html')
});

app.get('/api/notes', (req, res) => {
    return res.json(userNotes)});

app.post('/api/notes', (req, res) => {

});

app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
);

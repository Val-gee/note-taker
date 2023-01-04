const notes = require('express').Router();

const { v4: uuidv4 } = require('uuid');

const {
    readFromFile,
    readAndAppend,
} = require('../helpers/fsUtils');

//get route for retreiving all the notes
notes.get('/notes', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {
    console.log(req.body);

    //object deconstructoring to equal request.body
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.json('Error in adding note.')
    }
})


module.exports = notes;
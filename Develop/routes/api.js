const api = require('express').Router();

// const { v4: uuidv4 } = require('uuid');

const {
    readFromFile,
    writeToFile,
} = require('../helpers/fsUtils');

api.get('/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile('../db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            //make new array of all the notes expect the one with the ID provided in the url
            const result = json.filter((note) => note.notes_id !== noteId);

            return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID')
        });
});

api.delete('/api/notes/:id', (req, res) => {
    // let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    // let newNotes = notes.filter(note => note.id !== req.params.id);
    // fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(newNotes));
    // res.json(newNotes);
    const currentNoteId = req.params.id;
    console.log(currentNoteId);

    readFromFile('../db/notes.json')
    console.log('Read from file')
        .then((data) => JSON.parse(data))
        .then((json) => {
            //make a new array of all the notes except the one with the ID provided in the url
            const result = json.filter((note) => note.id !== currentNoteId);
            console.log(result);
            
            //save that new array to the file system
            writeToFile('../db/notes.json', result);
            console.log('Notes written to db.json file');

            //respond to the delete request
            res.json(`Note ${currentNoteId} has been deleted! 🗑️`)
        });
});

module.exports = api;
const fs = require("fs");

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    }catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var foundNote = {};
    notes.filter((note) => {
        if(note.title === title){
            foundNote.title = note.title;
            foundNote.body = note.body;
        }
    });
    return foundNote;
};

var removeNote = (title) => {
    //console.log("Removing note", title);
    var notes = fetchNotes();
    var removedNote = {};
    var newNotes = notes.filter((note) => {
        if(note.title !== title){
            return note;
        }else if(note.title === title){
            removedNote.title = note.title;
        }
    });
    saveNotes(newNotes);
    /*if(!removedNote.title){
        removedNote.errorMessage = `Note's title "${title}" doesn't exist, try again!`;
    }*/
    return removedNote;
};

var logNote = (note) => {
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
console.log("Starting app.js");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const argv = yargs.argv;

var command = argv._[0];
console.log("Command:", command);
console.log("Yargs:", argv);

if(command === "add"){
    var note = notes.addNote(argv.title, argv.body);

    if(note){
        console.log("Note created");
        console.log("--");
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }else{
        console.log("Note title already taken");
    }
    /*try{
        note.length !== 0;
        console.log("New note successfully added", note.title);
    }
    catch(e){
        console.log("Note title already used", e);
    }*/
}else if(command === "list"){
    notes.getAll();
}else if(command === "read"){
    notes.getNote(argv.title);
}else if(command === "remove"){
    var removedNote = notes.removeNote(argv.title);

    if(removedNote.title){
        console.log("Note removed");
        console.log("--");
        console.log(`Title: ${removedNote.title}`);
    }else{
        console.log(removedNote.errorMessage);
    }
}else{
    console.log("Command not recognized");
}
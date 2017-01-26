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
        notes.logNote(note);
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
    var foundNote = notes.getNote(argv.title);
    if(foundNote.title){
        console.log("Note found:");
        notes.logNote(foundNote);
    }else{
        console.log(`Note's title "${argv.title}" doesn't exist, try again!`);
    }
}else if(command === "remove"){
    var removedNote = notes.removeNote(argv.title);

    if(removedNote.title){
        console.log("Note removed");
        console.log("--");
        console.log(`Title: ${removedNote.title}`);
    }else{
        console.log(`Note's title "${argv.title}" doesn't exist, try again!`);
    }
}else{
    console.log("Command not recognized");
}
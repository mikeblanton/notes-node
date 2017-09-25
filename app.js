const fs = require('fs');
const _ = require('lodash');
const yargs  = require('yargs');

const notes = require('./notes.js');

// Command line params: add, remove, list
const argv = yargs.argv;
var command = argv._[0];
console.log('Yargs: ', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note saved!');
    notes.logNote(note);
  }
  else {
    console.log('Error saving your note');
  }
}
else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(JSON.stringify(allNotes));
}
else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note read!');
    notes.logNote(note);
  }
  else {
    console.log('Note not found');
  }
}
else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note removed' : 'Note not found';
  console.log(message);
}
else {
  console.log('Command not recognized');
}

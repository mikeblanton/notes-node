const fs = require('fs');
const _ = require('lodash');
const yargs  = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
}

// Command line params: add, remove, list
const argv = yargs
  .command('add', 'Add a note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help()
  .argv;
var command = argv._[0];

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
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
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

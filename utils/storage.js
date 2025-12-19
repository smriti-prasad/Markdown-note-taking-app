const fs = require('fs');
const path = require('path');

const NOTES_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(NOTES_DIR)) {
  fs.mkdirSync(NOTES_DIR);
}

const notesIndex = {};
//method of generating unique file names: timestamp+ counter+ random char
//you can find these files in the uploads folder!
let counter = 0;

function generateFileName() {
    const timestamp = Date.now();
    const randomChar = Math.random().toString(36).charAt(2); 

  return `${timestamp}-${counter}-${randomChar}.md`;
}

function saveNote(content) {
    const fileName = generateFileName();
    const filePath = path.join(NOTES_DIR, fileName);

    fs.writeFileSync(filePath, content, 'utf-8');

    const note = {
    id: fileName.replace('.md', ''),
    filePath,
    content
  };
    notesIndex[note.id] = note;

    return note;

}

function getNoteById(id) {
  return notesIndex[id] || null;
}

module.exports = { saveNote, getNoteById };
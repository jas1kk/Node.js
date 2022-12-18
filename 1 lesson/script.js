const fs = require('fs');

function getFirstWord(damn) {
  const fileContents = fs.readFileSync(damn, 'utf8');

  const words = fileContents.split(/\s+/);

  return words[0];
}

function getLastWord(damn) {
  const fileContents = fs.readFileSync(damn, 'utf8');

  const words = fileContents.split(/\s+/);

  return words[words.length - 1];
}

module.exports = {
  getFirstWord,
  getLastWord,
};
const files = require('./files');

const firstWord = files.getFirstWord('file.txt');

const lastWord = files.getLastWord('file.txt');

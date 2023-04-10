// find duplicate words in a filename

const regex = /\b(\w+)\b(?:\W+\1\b)+/gi;

function findDuplicateWordsInFileName(fileName) {
  const matches = fileName.match(regex);
  return matches ? matches.join(", ") : "";
}

const fileName = "file_name_with_duplicate_words.txt";
const duplicates = findDuplicateWordsInFileName(fileName);
console.log(duplicates);

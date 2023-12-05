// find duplicate words in a filename

const regex = /\b(\w+)\b(?:\W+\1\b)+/gi;

function findDuplicateWordsInFileName(fileName) {
  const matches = fileName.match(regex);
  return matches ? matches.join(", ") : "";
}

const fileName = "file_name_with_duplicate_words_words_file.txt";
const duplicates = findDuplicateWordsInFileName(fileName);
console.log("Dups: ",duplicates);





function findDuplicates(fileArray) {
  // Object to keep track of file name occurrences
  const fileOccurrences = {};

  // Iterate over the array and populate the fileOccurrences object
  fileArray.forEach(filePath => {
    // Extract the filename without extension
    const fileName = filePath.split('/').pop().split('.').shift();

    // Split the filename into words
    fileName.split('-').forEach(word => {
      if (fileOccurrences[word]) {
        // If the word is already in the object, push the filePath
        fileOccurrences[word].push(filePath);
      } else {
        // If the word is not in the object, initialize with the filePath
        fileOccurrences[word] = [filePath];
      }
    });
  });

  // Find and return file paths that have duplicates
  return Object.values(fileOccurrences).filter(paths => paths.length > 1).flat();
}

// Existing array
const fileArray = ["/hip-hop/hypntize-biggie.mp3", "/hip-hop/hypntize-biggie-clean.mp3", "/hip-hop/jay-z-biggie-money-love.mp3"];

// Find duplicates
const duplicates = findDuplicates(fileArray);
console.log(duplicates);



// This function works as follows:

// Extract Filenames: It takes each file path, extracts the filename, and removes the file extension.

// Split Filenames into Words: The filename is split into words (assuming words are separated by hyphens).

// Count Occurrences: It keeps track of how many times each word appears across all filenames.

// Identify Duplicates: If a word appears in more than one filename, all file paths containing that word are considered duplicates.

// Return Result: The function returns an array of file paths that have duplicates based on this criterion.

// This approach assumes that words in filenames are separated by hyphens and that duplicate detection is based on these words. You can adjust the criteria for identifying duplicates based on your specific needs.

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const watchedFolder = './watched'; // Change this to the folder you want to watch

// Initialize watcher.
const watcher = chokidar.watch(watchedFolder, {
  ignored: /^\./, // ignore dotfiles
  persistent: true
});

// Function to list all files in directory
function readDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    console.log(`Contents of ${directory}:`, files);
  });
}

// Function to create a new file
function createFile(filePath, content) {
  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error('Error creating file:', err);
      return;
    }
    console.log(`${filePath} has been created.`);
  });
}

// Function to read a file
function readFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log(`${filePath} contents:`, data);
  });
}

// Function to update a file
function updateFile(filePath, content) {
  fs.appendFile(filePath, content, err => {
    if (err) {
      console.error('Error updating file:', err);
      return;
    }
    console.log(`${filePath} has been updated.`);
  });
}

// Function to delete a file
function deleteFile(filePath) {
  fs.unlink(filePath, err => {
    if (err) {
      console.error('Error deleting file:', err);
      return;
    }
    console.log(`${filePath} has been deleted.`);
  });
}

// Add event listeners for the watcher
watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('error', error => console.error(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'));

// Example usage:
readDirectory(watchedFolder); // Reads the initial content of the directory
createFile(path.join(watchedFolder, 'newFile.txt'), 'Hello World!'); // Creates a new file
readFile(path.join(watchedFolder, 'newFile.txt')); // Reads the created file
updateFile(path.join(watchedFolder, 'newFile.txt'), '\nNew Line!'); // Updates the file
deleteFile(path.join(watchedFolder, 'newFile.txt')); // Deletes the file

// Keep the process running to watch for changes
process.stdin.resume();





/*
Create Folder
*/

const fs = require('fs');
const path = require('path');

const newFolderPath = path.join(__dirname, 'newFolder');

// Check if the folder already exists
if (!fs.existsSync(newFolderPath)) {
  // If the folder doesn't exist, create it
  fs.mkdirSync(newFolderPath, { recursive: true });
  console.log('Folder created:', newFolderPath);
} else {
  console.log('Folder already exists:', newFolderPath);
}

/*
Create Folder Async
*/

const fs = require('fs').promises;
const path = require('path');

async function createFolderIfNotExists(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log('Folder created:', folderPath);
  } catch (error) {
    if (error.code === 'EEXIST') {
      // The folder already exists
      console.log('Folder already exists:', folderPath);
    } else {
      // An error other than "folder already exists" occurred
      console.error('Error creating folder:', error);
    }
  }
}

const newFolderPath = path.join(__dirname, 'newFolder');
createFolderIfNotExists(newFolderPath);

/*
Delete Folder Async
*/

const fs = require('fs').promises;
const path = require('path');

async function deleteFolderIfExists(folderPath) {
  try {
    // Check if the folder exists
    await fs.access(folderPath);
    // If the folder exists, remove it
    await fs.rm(folderPath, { recursive: true, force: true });
    console.log('Folder deleted:', folderPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // The folder does not exist
      console.log('Folder does not exist, nothing to delete:', folderPath);
    } else {
      // An error other than "folder does not exist" occurred
      console.error('Error deleting folder:', error);
    }
  }
}

const folderPathToDelete = path.join(__dirname, 'folderToDelete');
deleteFolderIfExists(folderPathToDelete);

/*
Update Folder Async
*/

const fs = require('fs').promises;
const path = require('path');

async function renameFolderIfExists(currentFolderPath, newFolderPath) {
  try {
    // Check if the current folder exists
    await fs.access(currentFolderPath);

    // Rename or move the folder
    await fs.rename(currentFolderPath, newFolderPath);
    console.log(`Folder has been renamed/moved from ${currentFolderPath} to ${newFolderPath}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`The folder ${currentFolderPath} does not exist.`);
    } else {
      console.error('Error renaming folder:', error);
    }
  }
}

const currentFolderPath = path.join(__dirname, 'existingFolder');
const newFolderPath = path.join(__dirname, 'updatedFolder');

renameFolderIfExists(currentFolderPath, newFolderPath);





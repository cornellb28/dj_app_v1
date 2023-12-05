const fs = require('fs');

/**
 * Watches a folder for any file changes.
 * @param {string} folderPath - The path to the folder to watch.
 */
function watchFolder(folderPath) {
    fs.watch(folderPath, (eventType, filename) => {
        if (filename) {
            console.log(`File changed: ${filename}`);
            console.log(`Type of change: ${eventType}`);
        } else {
            console.log('The filename was not provided');
        }
    });

    console.log(`Now watching ${folderPath} for changes...`);
}

// Example usage
watchFolder('/path/to/your/folder');

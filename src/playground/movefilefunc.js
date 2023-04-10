// this will allow me to move multiple files at one time in node

const fs = require('fs');
const path = require('path');

function moveFiles(files, sourceDir, destDir) {
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);

    fs.rename(sourcePath, destPath, err => {
      if (err) {
        console.error(`Failed to move ${sourcePath}: ${err}`);
      } else {
        console.log(`Successfully moved ${sourcePath} to ${destPath}`);
      }
    });
  });
}

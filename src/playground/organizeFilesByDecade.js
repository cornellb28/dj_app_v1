function organizeFilesByDecade(files) {
    return files.reduce((acc, file) => {
        // Assuming file paths are strings containing the decade as a subfolder
        if (file.includes('/70s/')) {
            acc['70s'] = acc['70s'] || [];
            if (acc['70s'].length < 2) {
                acc['70s'].push(file);
            }
        } else if (file.includes('/80s/')) {
            acc['80s'] = acc['80s'] || [];
            if (acc['80s'].length < 2) {
                acc['80s'].push(file);
            }
        } else if (file.includes('/90s/')) {
            acc['90s'] = acc['90s'] || [];
            if (acc['90s'].length < 2) {
                acc['90s'].push(file);
            }
        }
        return acc;
    }, {});
}

// Example usage
const files = [
    'path/to/70s/file1.mp3',
    'path/to/70s/file2.mp3',
    'path/to/80s/file1.mp3',
    'path/to/80s/file2.mp3',
    'path/to/90s/file1.mp3',
    'path/to/90s/file2.mp3',
    // ... more files
];

const organizedFiles = organizeFilesByDecade(files);
console.log(organizedFiles);

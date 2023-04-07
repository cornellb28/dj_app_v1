const NodeID3 = require('node-id3');
const fs = require('fs');
const jsmediatags = require("jsmediatags");

// for (let key of properties) {
//         // Object.keys(tags)[0] !== key
//         if (!tags.hasOwnProperty(key)) {
//             if (metadata.common.hasOwnProperty(key)) {
//                 tagList[key] = metadata.common[key];
//             } else if (metadata.format.hasOwnProperty(key)) {
//                 tagList[key] = metadata.format[key];
//             } else {
//                 tagList[key] = `default ${key}`;
//             }
//         } else {
//             tagList[key] = tags[key]
//         }
//     }

//     const finalTags = { ...tags, ...tagList };
//     console.log("finalTags", finalTags);


// const mm = require('music-metadata');

// async function getBpmFromMp3(filePath) {
//   try {
//     const metadata = await mm.parseFile(filePath, { duration: false });
//     const bpm = metadata.common.bpm;
//     return bpm;
//   } catch (error) {
//     console.error(error.message);
//     return null;
//   }
// }

// // Example usage:
// getBpmFromMp3('path/to/your/file.mp3')
//   .then(bpm => console.log(`BPM: ${bpm}`));



const filepath = ['/Volumes/MUSIKBUCKET/SERATOCOLLECTION/Funk/Mr. Carmack - ODE TO DOOBIE PT. 2 (VACCINE DREAMS).mp3'];

async function addMp3Tags(filename, tags) {
    // Read the existing tags from the MP3 file
    const existingTags = NodeID3.read(filename);
    console.log(existingTags);
    // Merge the new tags with the existing tags
    const mergedTags = Object.assign({}, existingTags, tags);

    // Write the merged tags to the MP3 file
    NodeID3.write(mergedTags, filename);

    console.log('ID3 tags added to MP3 file:', filename);
}

const tags = {
    title: 'My Song',
    artist: 'My Artist',
    album: 'My Album'
}

addMp3Tags(filepath, tags);


// console.log("node-id3", tags)
// console.log("jsmediatags", audioData)
// const filestat = fs.statSync(filepath);
// console.log(filestat);

// async function test() {
//     let meta = await fs.createReadStream(filepath);
//     const metadata = await musicMetadata.parseNodeStream(meta, null, { duration: true });
//     console.log(metadata)
// }


//test();

// const audioData = fs.readFileSync(filepath);

// const bpm = bpmDetector(audioData);

// console.log(`The BPM of the file is ${bpm}`);


// const isDirectory = (fileNames) => {
//     try {
//         let check = false;
//         for (let file of fileNames) {
//             let checkStatus = fs.lstat(file, (err, stats) => {
//                 console.log("g", stats.isFile())
//                 return stats.isDirectory() === false ? false : true;
//             })

//             if (checkStatus === false) return;
//             check = checkStatus;
//         }
//         return check;
//     } catch (error) {
//         console.log(error)
//     }

// };


// isDirectory(filepath);
import { getExtension } from "./"; 

export const createTrackMeta =  async (trackpath, options) => {
    try {
        const tags = await nodeID3.read(trackpath, options);
        console.log("tags", tags)

        const getmediaType = async (file) => {
            const stats = await fs.stat(file);
            return stats.size;
        }

        const imagetag = tags.image != null ? { image: tags.image } : {};

        const tagList = {
            ...tags,
            ...imagetag,
            fileType: getExtension(trackpath),
            size: await getmediaType(trackpath),
            location: trackpath,
            title: tags.title || metadata.common.title || "",
            album: tags.album || metadata.common.album || "",
            bpm: tags.bpm || metadata.common.bpm || "",
            year: tags.year || metadata.common.year || "",
            initialKey: tags.initialKey || metadata.common.key || "",
            length: metadata.common.duration || "",
            bitrate: tags.bitrate || metadata.format.bitrate || 0,
            fileType: tags.fileType || metadata.format.fileType || "",
        };
        return tagList;
    } catch (error) {
        console.error(error);
        return null;

    }
};
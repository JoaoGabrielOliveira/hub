const VIDEO_EXTENSION_LIST = [
    "mp4", "mkv"
]

/**
 * @param {String} filename
 * @returns {boolean}
*/
export function isFileAVideo(filename){
    return VIDEO_EXTENSION_LIST.includes(
        getExtension(filename)
    );
}

/** @param {String} filename */
export function getExtension(filename){
    let filenameSplited = filename.split('.');    
    return filenameSplited[filenameSplited.length - 1];
}
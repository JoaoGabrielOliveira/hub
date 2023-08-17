import fs from "fs";


const VIDEO_EXTENSION_LIST = [
    "mp4", "mkv"
]

export default function getAllVideosOfAPath(path : string){
    return fs.readdirSync(path, {withFileTypes:true})
    .filter(file => isFileAVideo(file.name));
}

export function isFileAVideo(filename : string){
    return VIDEO_EXTENSION_LIST.includes(
        getExtension(filename)
    );
}

export function getExtension(filename : string){
    let filenameSplited = filename.split('.');    
    return filenameSplited[filenameSplited.length - 1];
}
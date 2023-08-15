import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export default function convertVideo(filePath, mapOptions, outputFolder, outputFilename) {
    return new Promise(function(resolve, reject) {    
        ffmpeg(filePath, {})
            .addOptions(mapOptions)
            .output(`${outputFolder}/${outputFilename}.mp4`)
            .on('end', () => resolve(new ConvertResponse(outputFilename, '.mp4', outputFolder)))
            .on('error', (error) => reject(error))
        .run();
    });
}

class ConvertResponse {
    filename;
    extension;
    outputFolder;

    constructor(filename, extension, outputFolder){
        this.filename = filename;
        this.extension = extension;
        this.outputFolder = outputFolder;
    }

    getFilenameWithExtension(){
        return this.filename + this.extension;
    }

    getCompletePathfile(){
        return this.outputPath + this.getFilenameWithExtension();
    }

}
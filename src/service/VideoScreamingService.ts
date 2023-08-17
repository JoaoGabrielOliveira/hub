import { Response } from 'express';
import fs from 'fs';

export default class VideoScreamingService {
    private static SINGLETON : VideoScreamingService;

    public static getInstance(){
        if(!this.SINGLETON)
            this.SINGLETON = new VideoScreamingService();

        return this.SINGLETON;
    }

    getVideoStream(filePath : string, range, response : Response){
        this.checkIfFileExists(filePath);
        const fileSize = this.getFileSize(filePath);

        if(range){
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        
            const {file, headers} = this.createVideoStreamByRange(filePath, fileSize, start, end);

            response.writeHead(206, headers);        
            file.pipe(response);
        }
        else {
            response.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            });
            fs.createReadStream(filePath).pipe(response);
        }

        return response;
    }

    private createVideoStreamByRange(filePath: string, fileSize: number, start: number, end: number){
        const file = fs.createReadStream(filePath, {start: start, end: end});
        const chuckSize = end - start + 1;
        const headers = {
            'Content-Range' : `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges' : 'bytes',
            'Content-Length':  chuckSize,
            'Content-Type'  : 'video/mp4'
        };

        return {file, headers};
    }

    getFileSize(filePath){
        return fs.statSync(filePath).size;
    }

    checkIfFileExists(filePath : string){
        if(!fs.existsSync(filePath))
            throw new Error('File does not exist. ' + filePath)
    }
}

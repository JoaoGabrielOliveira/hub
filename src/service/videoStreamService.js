import fs from 'fs';

export default function getVideoStream(filePath, range, response){
    if(!fs.existsSync(filePath)){
        throw new Error('Arquivo não foi encontrado');
    }

    const fileSize = fs.statSync(filePath).size;

    if(range){
        var startEndRange = getStartAndEndOfRange(range, fileSize);
        console.log("chuckSize:", startEndRange.chuckSize);

        const file = fs.createReadStream(filePath, startEndRange);
        const head = {
            'Content-Range': `bytes ${startEndRange.start}-${startEndRange.end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': startEndRange.chuckSize,
            'Content-Type': 'video/mp4'
        };

        response.writeHead(206, head);
        file.pipe(response);
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        response.writeHead(200, head);
        fs.createReadStream(filePath).pipe(response)
    }

    return response;
}

function getStartAndEndOfRange(range, size) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;

    return {
        start: start, end: end, chuckSize: end - start +  1
    }
}
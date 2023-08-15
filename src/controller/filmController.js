import fs from 'fs';
var filePath = "J:/Downloads/Como Eu Conheci Sua Mãe 2007 - 3ª Temporada Completa [WEB-DL] WWW.BLUDV.COM/S3E1.mkv";

export default function index(req, res) {
    if(!fs.existsSync(filePath)){
        res.status(404).send({
            message: "Arquivo não encontrado"
        });
        return res;
    }

    const fileSize = fs.statSync(filePath).size;
    const range = req.headers.range;

    if(range){
        var response = getStartAndEndOfRange(range, fileSize);
        console.log("chuckSize:", response.chuckSize);

        const file = fs.createReadStream(filePath, response);
        const head = {
            'Content-Range': `bytes ${response.start}-${response.end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': response.chuckSize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(206, head);
        file.pipe(res);
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res)
    }
}

function getStartAndEndOfRange(range, size) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;

    return {
        start: start, end: end, chuckSize: end - start +  1
    }
}
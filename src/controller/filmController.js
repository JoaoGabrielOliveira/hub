import getVideoStream from '../service/videoStreamService.js';


export default function index(req, res) {
    getVideoStream(
        "J:/Downloads/Como Eu Conheci Sua Mãe 2007 - 3ª Temporada Completa [WEB-DL] WWW.BLUDV.COM/How.I.Met.Your.Mother.S03E01.720p.WEB-DL.6CH.x264.DUAL-WWW.BLUDV.COM.mkv",
        req.headers.range, res);
}
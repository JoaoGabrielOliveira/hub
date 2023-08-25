import ConvertService from "../service/ConvertService";


const convertService = new ConvertService();
const filePath = "J:/Downloads/mEME.mp4";
const outputDir = "J:/Downloads/Como Eu Conheci Sua Mãe - HLS";
const outputFilename = "meme";

convertService.convertToHLS(filePath, outputDir, outputFilename, 1);

import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg'
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ConvertResponse from '../model/response/ConvertResponse';
import { logError, logInfo } from '../util/Events';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export default class ConvertService {

    convertToHLS(inputFile : string, outputDir : string, outFilename : string, segmentDuration:number) {
        logInfo("ConvertService - Staring convert file", inputFile);

        let command = ffmpeg()
            .addInput(inputFile)
            .addOptions([
                '-profile:v baseline',
                '-level 3.0',
                '-start_number 0',
                `-hls_time ${segmentDuration.toString()}`,
                '-hls_list_size 0',
                '-f hls'
            ])
            .output(`${outputDir}/${outFilename}.m3u8`);

        logInfo("ConvertService - Commnand to convert was created", command);
        command.run();
        return new Promise<ConvertResponse | {error: any,  command: FfmpegCommand}>( (resolver, rejects) => {
            command.on('end', (event) => {
                let response = new ConvertResponse(outFilename, outputDir, event);
                logInfo("ConvertService - Video was converted with successfully!", response);
                resolver(response)
            }
            );

            command.on('exit', (event) => {
                let errorData = {error: event,  command: command}
                logError("ConvertService - Video was converted with successfully!", errorData);
                rejects(errorData);
            });
        });
    }
}
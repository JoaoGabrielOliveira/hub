import { AppDataSource } from "../database/DataSource";
import { Show } from "../model/Show";
import Video from "../model/Video";
import getAllVideosOfAPath from "../util/FileHelper";
import { BaseService } from "./BaseService";

export default class VideoService extends BaseService<Video> {
    private static SINGLETON : VideoService;

    constructor(){
        super();
        this.repository = AppDataSource.getRepository(Video);
        this.nameTable = "Videos";
    }

    findAllVideoInFolderShow(show : Show, titleFormat : string = "{e}"){
        let internalIndex = 0;
        return getAllVideosOfAPath(show.pathFolder)
            .map(video => {
                internalIndex++;
                return new Video()
                    .setIdShow(show.id)
                    .setFileName(video.name)
                    .setTitle(titleFormat.replace("{e}", internalIndex.toString()))
                    .setNumberOrder(internalIndex);
            });
    }

    createVideosByShow(show : Show, titleFormat : string = "{e}") {
        const videos = this.findAllVideoInFolderShow(show, titleFormat);
        return this.saveAll(videos);
    }

    static getInstance() : VideoService{
        if(!this.SINGLETON)
            this.SINGLETON = new VideoService();
        return this.SINGLETON;
    }
}
import { AppDataSource } from "../database/DataSource";
import Video from "../model/Video";
import { BaseService } from "./BaseService";

export default class VideoService extends BaseService<Video> {
    private static SINGLETON : VideoService;

    constructor(){
        super();
        this.repository = AppDataSource.getRepository(Video);
        this.nameTable = "Videos";
    }

    static getInstance() : VideoService{
        if(!this.SINGLETON)
            this.SINGLETON = new VideoService();
        return this.SINGLETON;
    }
}
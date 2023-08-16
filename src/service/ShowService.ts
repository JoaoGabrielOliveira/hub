import { AppDataSource } from "../database/DataSource";
import { Show } from "../model/Show";
import { BaseService } from "./BaseService";

export default class ShowService extends BaseService<Show> {
    private static SINGLETON : ShowService;

    constructor(){
        super();
        this.repository = AppDataSource.getRepository(Show);
        this.nameTable = "Shows"
    }

    public static getInstance(){
        if(!this.SINGLETON)
            this.SINGLETON = new ShowService();

        return this.SINGLETON;
    }
}
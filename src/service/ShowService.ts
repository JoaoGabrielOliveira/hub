import { AppDataSource } from "../database/DataSource";
import { Show } from "../model/Show";
import { BaseService } from "./BaseService";

export default class ShowService extends BaseService<Show> {
    constructor(){
        super();
        this.repository = AppDataSource.getRepository(Show);
    }
}
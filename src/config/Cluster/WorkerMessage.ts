import { Worker } from "cluster";

export default class WorkerMessage {
    constructor(
        public id:number,
        public status:string,
        public worker: Worker)
        {}
}
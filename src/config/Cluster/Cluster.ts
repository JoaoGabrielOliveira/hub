import cluster, { Worker } from "cluster";
import { logInfo } from "../../util/Events";
import WorkerMessage from "./WorkerMessage";

let workers = new Array<WorkerMessage>();

export function addWorker(){
    let worker = cluster.fork();
    worker.on('online', () => whenWorkerIsOnline(worker));
}

export function startWorkers(numberOfWorkers : number){
    for (let i = 0; i < numberOfWorkers; i++)
        addWorker();
}

function addToListOfWorkers(message:WorkerMessage){
    workers.push(message);
    logInfo("Worker was added with sucess!", message);
}

function whenWorkerIsOnline(worker : Worker) {
    let message = new WorkerMessage(worker.id, 'new', worker)
    logInfo(`Worker ${message.id} is online`, message.status);
    this.worker.send(message)
}

//#region Cluster Event
cluster.setupPrimary({
    exec: __dirname + "/index.ts"
});

cluster.on("message", (message: WorkerMessage) => {
    addToListOfWorkers(message);
});
//#endregion

startWorkers(10);
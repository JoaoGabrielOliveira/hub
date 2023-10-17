import { argv, exit } from "process";
import ShowService from "../service/ShowService";
import VideoService from "../service/VideoService";
import { AppDataSource } from "../database/DataSource";
import { logError, logInfo } from "../util/Events";
import { Show } from "../model/Show";

AppDataSource.initialize().then(async () => {
    logInfo("Initing connection with database!", {});

    if(argv.length < 4){
        logError("Não contem argumentos", null);
        logError("npm run add:show [nome do show] [pasta dos videos] [titulo dos videos: ex: S3E{e}]", null);
        exit(1);
    }
    
    
    ShowService.getInstance().findOneBy({title: argv[2]}).then(show => {
        if(show){
            logError("Show já existe!", show);
            exit(1);
        }

        show = new Show();
        show.title = argv[2];
        show.pathFolder = argv[3];
    
        show.save().then(result => {
            const VIDEO_INSTANCE = VideoService.getInstance();
            const VIDEOS_OF_SHOW = VIDEO_INSTANCE.findAllVideoInFolderShow(result, argv[4]);
            
            if(VIDEOS_OF_SHOW.length < 1) {
                logError("Não há videos para esse show!", VIDEOS_OF_SHOW);
                exit(1);
            }
    
            VIDEO_INSTANCE.saveAll(VIDEOS_OF_SHOW);
        });
    });

}).catch(error => logError(error.message, error));
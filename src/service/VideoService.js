import { listAllVideos } from "./videoCatalogService.js";

export default class VideoService {
    findOne(id, videos) {
        console.log(videos);
        return videos.find(video => {
            return video.id == id;
        })
    }

    findOneByTitle(title, videos) {
        console.log(videos);
        return videos.find(video => {
            return video.title == title;
        })
    }

    getVideosAndGiveTitle(pathFolder, titleFormat) {
        return listAllVideos(pathFolder, titleFormat)
    }
}
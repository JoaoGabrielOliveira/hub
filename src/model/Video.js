export default class Video {
    id;
    idShow;
    fileName;
    title;
    numberOrder;

    constructor(id, idShow, fileName, title, numberOrder){
        this.id = id;
        this.idShow = idShow;
        this.fileName = fileName;
        this.title = title;
        this.numberOrder = numberOrder;
    }
}
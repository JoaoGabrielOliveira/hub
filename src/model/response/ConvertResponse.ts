export default class ConvertResponse {
    constructor(public filename : string, public outputFolder : string, public eventData:any){
    }

    getCompletePathfile(){
        return `${this.outputFolder}/${this.filename}`;
    }

}
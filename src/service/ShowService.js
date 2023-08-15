import Show from '../model/Show.js';


export default class ShowService {
    static EXAMPLE_DATABASE = [
        new Show(3, "Como eu conheci sua mãe - Temporada 3", "J:/Downloads/Como Eu Conheci Sua Mãe 2007 - 3ª Temporada Completa [WEB-DL] WWW.BLUDV.COM/")
    ];

    getAllShow() {
        return ShowService.EXAMPLE_DATABASE;
    }

    getShow(id){
        return ShowService.EXAMPLE_DATABASE.find( show => show.id == id);
    }
}
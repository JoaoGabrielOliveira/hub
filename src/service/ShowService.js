import Show from '../model/Show.js';

const EXAMPLE_DATABASE = [
    new Show(3, "Como eu conheci sua mãe - Temporada 3", "J:/Downloads/Como Eu Conheci Sua Mãe 2007 - 3ª Temporada Completa [WEB-DL] WWW.BLUDV.COM/")
]

export function getShow(id){
    return EXAMPLE_DATABASE.find( show => show.id == id);
}
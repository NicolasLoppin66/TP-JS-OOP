import app from "./App";

/* Modèle objet litteral d'un Marker
{
    title: '',
    content: '',
    dateCreate: 1666180099794,
    dateUpdate: 1666180099794
}
 */
export class Marker {
    title;
    content;
    dateCreate;
    dateUpdate;

    constructor(markerLiteral) {
        this.title = markerLiteral.title;
        this.content = markerLiteral.content;
        this.dateCreate = markerLiteral.dateCreate;
        this.dateUpdate = markerLiteral.dateUpdate;
    }

    toJSON() {
        return {
            title: this.title,
            content: this.content,
            dateCreate: this.dateCreate,
            dateUpdate: this.dateUpdate,
        };
    }
}
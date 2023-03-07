export class LocalEvt {
    title;
    description;
    latitude;
    longitude;
    dateDebut;
    dateFin;

    constructor(dataJson) {
        this.title = dataJson.title;
        this.description = dataJson.description;
        this.latitude = dataJson.latitude;
        this.longitude = dataJson.longitude;
        this.dateDebut = dataJson.dateDebut;
        this.dateFin = dataJson.dateFin;
    }
}
import mapboxgl, { Popup } from "mapbox-gl";

import { LocalEvt } from './LocalEvt';
import { LocalStorageService } from "../Services/LocalStorageService";

const STORAGE_NAME = "service_marker";

export class Marker {
    /* +++++ Element du DOM +++++ */

    arrLocalEvt = [];
    localEvt;

    value;
    form;
    map;

    evtDescription;
    evtDateDebut;
    evtDateFin;
    evtSubmit;
    evtTitle;
    evtLng;
    evtLat;

    constructor(map) {
        this.map = map;
        this.evtTitle = document.getElementById('title');
        this.evtDescription = document.getElementById('description');
        this.evtLat = document.getElementById('lat');
        this.evtLng = document.getElementById('lng');
        this.evtDateDebut = document.getElementById('dateDebut');
        this.evtDateFin = document.getElementById('dateFin');
        this.evtSubmit = document.getElementById('submit');

        this.form = document.forms[0];
        this.form.addEventListener('submit', this.handlerNewMarker.bind(this));

        this.LocalEvt = new LocalStorageService(STORAGE_NAME);
    }

    /**
     * Récupération et affichage des données du localStorage
     * @returns data
     */
    start() {
        let dataJson = this.localEvt.getJSON();
        console.log(dataJson);
        if (dataJson === null) {
            return;
        }
        for (let i of dataJson) this.arrLocalEvt.push(new LocalEvt(i));
        this.render();
    }

    /** 
     * Ajout de l'evenement dans le local storage
     * @param {strTitle strDescription strLat strLng strDateDebut strDateFin} evt 
     */
    handlerNewMarker(evt) {
        let strTitle = this.evtTitle.value.trim();
        let strDescription = this.evtDescription.value.trim();
        let strLat = this.evtLat.value;
        let strLng = this.evtLng.value;
        let strDateDebut = this.evtDateDebut.value;
        let strDateFin = this.evtDateFin.value;

        evt.preventDefault();

        // newLocalEvt est définit comme un objet vide.
        const newLocalEvt = {};

        console.log(newLocalEvt);

        newLocalEvt.title = strTitle;
        newLocalEvt.description = strDescription;
        newLocalEvt.lat = strLat;
        newLocalEvt.lng = strLng;
        newLocalEvt.dateDebut = strDateDebut;
        newLocalEvt.dateFin = strDateFin;

        console.log(newLocalEvt);

        this.arrLocalEvt.push(new LocalEvt(newLocalEvt));

        this.render();

        this.localEvt.setJSON(this.arrLocalEvt);
    }

    /**
     * Affichage des markers avec gestion de sa couleur 
     * @param {*} localEvt 
     */
    markerColor(localEvt) {
        let colorMarker = '';

        const debut = new Date(localEvt.dateDebut).getTime();
        const fin = new Date(localEvt.dateFin).getTime();
        const maintenant = new Date().getTime();

        // Evenement dans plus de 3 jours.
        if (debut > maintenant && debut > maintenant + (3 * 24 * 60 * 60 * 1000)) {
            colorMarker = '#16FF00';
        }
        // Evenement dans 3 jours ou moins.
        if (debut > maintenant && debut < maintenant + (3 * 24 * 60 * 60 * 1000)) {
            colorMarker = '#FF6D28';
        }
        // Evenement dépassé.
        if (fin < maintenant) {
            colorMarker = '#FF1E1E';
        }

        // Définit les color au marker de mapbox.
        const marker = new mapboxgl.Marker({
            color: colorMarker
        });

        /**
         * Affichage des infos au survol du marker
         */
        let markerDiv = marker.getElement();
        markerDiv.title = (
            `${localEvt.title} du ${localEvt.dateDebut} au ${localEvt.dateFin}`
        );

        marker.setLngLat({
            lon: localEvt.lng,
            lat: localEvt.lat
        });

        /**
         * Construction de la Popup au click sur le marker
         */
        const markerPopup = new mapboxgl.Popup();
        markerPopup.setHTML(
            `<h2>${localEvt.title}</h2>` +
            `<p>${localEvt.description}</p>` +
            `<p>${localEvt.dateDebut} au ${localEvt.dateFin}</p>` +
            `<p>lat : ${localEvt.lat}, lng : ${localEvt.lng}</p>`
        )

        marker.setPopup(markerPopup);
        marker.addTo(this.map.map);
    }

    render() {
        for (let i of this.arrLocalEvt) {
            this.markerColor(i);
        }
    }
}
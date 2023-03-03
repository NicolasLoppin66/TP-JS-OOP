// Importation du la config avec la clé d'api de mapbox
import Config from '../../app.config.json';
import 'mapbox-gl/dist/mapbox-gl.css';

// 
// import { MarkerService } from './Services/MarkerService';

// Importation du style de base du site
import '../Assets/style.css'

// Importation du module mapbox
import mapboxGL from 'mapbox-gl';
import { MarkerService } from './Services/MarkerService';

class App {
    /**
     * <div> de la map mapbox.
     */
    elDivMap;

    /**
     * Instance de la map mapbox.
     */
    map;

    /**
     * <div> du formulaire d'ajout de marker.
     */
    elDivForm;

    /**
     * <form> du formulaire.
     */
    elForm;

    /**
     * <input type="text"> pour l'insertion du titre.
     */
    elInputTitle;

    /**
     * <textarea> pour l'insertion de la description.
     */
    elInputDescEvent;

    /**
     * <input type="datetime-local"> pour l'inserion de la date de début et la date de fin de l'evenement.
     */
    elInputDate;

    /**
     * <input type="number"> pour l'insertion des coordonnée géographique.
     */
    elInputCoord;

    start() {
        console.log('App démarrer ...');
        // console.log("la clé d'api est :", Config.api.mapbox_gl.Api_Key);

        this.initDom();
        this.initMapBox();
    }

    initDom() {
        // Création de la div dans le document (dans la page du site)
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        // Création de la balise <form noValidate>
        const elForm = document.createElement('form');
        elForm.noValidate = true;

        // Création du l'input <input type="text">
        this.elInputTitle = document.createElement('input');
        this.elInputTitle.setAttribut('type', 'text');
        this.elInputTitle.setAttribut('placeholder', 'Titre');

        this.elInputDescEvent = document.createElement('textarea');
        this.elInputDescEvent.setAttribut('placeholer', 'Description');

        this.elInputDate = document.createElement('input');
        this.elInputDate.setAttribut('type', 'datetime-local');
        this.elInputDate.setAttribut('placeholder', 'Date de début');

        this.elInputDate = document.createElement('input');
        this.elInputDate.setAttribut('type', 'datetime-local');
        this.elInputDate.setAttribut('placeholder', 'Date de fin');

        this.elInputCoord = document.createElement('input');
        this.elInputCoord.setAttribut('type', 'number');

        const elBtnNewMarker = document.createElement('button');
        elBtnNewMarker.type = 'button';
        elBtnNewMarker.textContent = "Ajouter l'evenement";
        elBtnNewMarker.addEventListener('click',)

        document.body.append(this.elDivMap);
    }

    initMapBox() {
        // Instancie la carte et récupere la clé api.
        mapboxGL.accessToken = Config.api.mapbox_gl.Api_Key;

        // Affiche la carte MapBox
        this.map = new mapboxGL.Map({
            container: this.elDivMap,
            style: Config.api.mapbox_gl.Map_Styles.streets, // Vas récupéré dans le config le style de la carte MapBox
            center: { lng: 2.2137, lat: 46.2276 }, // Centre la carte au niveau de la France.
            zoom: 5, // Mais un zoom initiale de 5.
            maxZoom: 12, // Le zoom est restraint a 12 au maximum. (0 - 24)
            minZoom: 3 // Le zoom est restraint a 3 au minimum. (0 - 24)
        });

        // Crée une marque au click sur la carte
        this.map.on('click', this.mapHandlerClickMap.bind(this));
    }

    /* +++++ Gestionnaire d'evenement +++++ */

    /**
     * Ajout d'un marker au click avec coordonnée dans les logs.
     * @param {*} evt 
     */
    mapHandlerClickMap(evt) {
        console.log('-----');
        console.log('lat :', evt.lngLat.lat); // Montre lattitude du marker.
        console.log('lng :', evt.lngLat.lng); // Montre la longitute du marker.
        console.log('-----');

        const marker = new mapboxGL.Marker({
            color: 'green', // Evenement dans plus de 3 jours.
            color: 'orange', // Evenement dans 3 jours ou moin.
            color: 'red' // Evenement dépassé.
        });

        marker.setLngLat(evt.lngLat);

        marker.addTo(this.map);
    }
}

const app = new App();

export default app;
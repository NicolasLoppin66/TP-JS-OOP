// Importation de la config avec la clé d'api de mapbox et son style.
import 'mapbox-gl/dist/mapbox-gl.css';

// Importation du style de base du site.
import '../Assets/Style/style.css'
import '../Assets/Style/bootstrap.css'
import '../Assets/Style/bootstrap-utilities.css'

// Importation des Class.
import { Map } from './Entity/Map';
import { Marker } from './Entity/Marker';
import { Form } from './Entity/Form';

// Création de la constante de stockage.
const STORAGE_NAME = 'service_marker';

class App {

    value

    constructor() {
        this.map = new Map();
        this.form = new Form();
        this.marker = new Marker(this.map);
    }

    start() {
        console.log('App démarrer ...');
        // console.log("la clé d'api est :", Config.api.mapbox_gl.Api_Key);

        this.map.mapInit();

        this.form.initForm();

        this.map.navigationControl();
        this.map.geolocationControl();
        this.map.getCoordinate();

        // Récupération et affichage des données du localStorage
        this.marker.start();

    }

    // initMapBox() {
    //     // Création de la div dans le document (dans la page du site)
    //     this.elDivMap = document.createElement('div');
    //     this.elDivMap.id = 'map';

    //     document.body.append(this.elDivMap);

    //     // Instancie la carte et récupere la clé api.
    //     mapboxGL.accessToken = Config.api.mapbox_gl.api_key;

    //     // Affiche la carte MapBox
    //     this.map =
    //         new mapboxGL.Map({
    //             attributionControl: false,
    //             container: this.elDivMap, // Récupération de l'identifiant du container de la map (ID : #map)
    //             style: Config.api.mapbox_gl.map_style.streets, // Vas récupéré dans le config le style de la carte MapBox
    //             center: { lng: 6.0935318, lat: 46.5975118 }, // Centre la carte au niveau de la France. 46.8789065,6.1736436,6
    //             zoom: 5.5, // Mais un zoom initiale de 5.
    //             maxZoom: 12, // Le zoom est restraint a 12 au maximum. (0 - 24) | (0 < x < 24)
    //             minZoom: 3 // Le zoom est restraint a 3 au minimum. (0 - 24) | (0 < x < 24)

    //         });
    //     this.map.addControl(new mapboxGL.GeolocateControl({
    //         positionOptions: {
    //             enableHighAccuracy: true
    //         }
    //     }));
    //     this.map.addControl(new mapboxGL.NavigationControl({
    //         visualizePitch: true,
    //         showCompass: true, // Permet l'apparition du compas sur la carte mapbox
    //         showZoom: true, // Permet l'affiche sur la carte des bouton + | - pour le zoom sur la carte.
    //     }));

    //     // Crée une marque au click sur la carte
    //     this.map.on('click', this.mapHandlerClickMap.bind(this));
    // }

    /* +++++ Gestionnaire d'evenement +++++ */

    /**
     * Ajout d'un marker au click avec coordonnée dans les logs.
     * @param {*} evt
     */
    // mapHandlerClickMap(evt) {
    //     console.log('-----');
    //     console.log('lat :', evt.lngLat.lat); // Montre lattitude du marker.
    //     console.log('lng :', evt.lngLat.lng); // Montre la longitute du marker.
    //     console.log('-----');

    //     const marker = new mapboxGL.Marker({
    //         anchor: "center",
    //         color: 'green', // Evenement dans plus de 3 jours.
    //         // color: 'orange', // Evenement dans 3 jours ou moin.
    //         // color: 'red' // Evenement dépassé.
    //     });

    //     const popup = new mapboxGL.Popup({
    //         anchor: 'center',
    //     })

    //     popup.setLngLat(evt.lngLat);
    //     popup.setMaxWidth('300px');
    //     popup.addTo(this.map);

    //     marker.setLngLat(evt.lngLat);
    //     marker.setPopup(new mapboxGL.Popup().setHTML("<p>cc tlm</p>"))
    //     marker.addTo(this.map);
    //     marker.togglePopup();
    // }

    /**
     * Fonctionnalité d'ajout d'un nouveau marker
     * @param evt
     */
    // handlerAddMarker(evt) {
    //     // On récupère le timestamp de la création
    //     let
    //         now = Date.now(),
    //         newTitle = this.elInputTitle.value.trim(),
    //         newContent = this.elInputDescEvent.value.trim();

    //     if (newTitle === '' || newContent === '') {
    //         this.elInputTitle.value
    //             = this.elInputDescEvent.value
    //             = '';

    //         return;
    //     }

    //     // On reconstitue un objet de données
    //     const newMarkerLiteral = {
    //         title: newTitle,
    //         content: newContent,
    //         dateCreate: now,
    //         dateUpdate: now
    //     };

    //     // On ajoute cet objet à la map
    //     this.arrMarker.push(new Marker(newMarkerLiteral));

    //     // Sauvegarde des données
    //     this.markerService.saveAll();

    //     // On vide le formulaire d'ajout
    //     this.elInputTitle.value
    //         = this.elInputDescEvent.value
    //         = '';

    //     // On met le focus sur le premier champ
    //     this.elInputTitle.focus();

    //     // On relance le rendu des markers
    //     this.renderMarker();
    // }
}

const app = new App();

export default app;
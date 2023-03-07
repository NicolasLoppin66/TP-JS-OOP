// Importation de la config avec la clé d'api de mapbox et son style.
import Config from '../../app.config.json';
import 'mapbox-gl/dist/mapbox-gl.css';

// Importation du service de marker.
import { MarkerService } from './Services/MarkerService';

// Importation du style de base du site.
import '../Assets/Style/style.css'
import '../Assets/Style/bootstrap.css'
import '../Assets/Style/bootstrap-utilities.css'

// Importation du module mapbox.
import mapboxGL from 'mapbox-gl';

// Création de la constante de stockage.
const STORAGE_NAME = 'service_marker';

class App {
    /* +++++ Element du DOM +++++ */
    /**
     * <div> de la map mapbox.
     */
    elDivMap;

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
     * <input type="datetime-local"> pour l'insertion de la date de début et la date de fin de l'evenement.
     */
    elInputDateDebut;

    /**
     * <input type="datetime-local"> pour l'insertion de la date de début et la date de fin de l'evenement.
     */
    elInputDateFin;

    /**
     * <input type="number"> pour l'insertion des coordonnées géographiques en latiltude.
     */
    elInputCoordLat;

    /**
     * <input type="number"> pour l'insertion des coordonnées géographiques Longitude.
     */
    elInputCoordLng;

    /**
     * <input type="submit"> pour comfirmer l'insertion des info
     */
    elSubmit;

    labelTitle

    /* +++++ Propriétés de fonctionnement +++++ */
    /**
     * Instance de la map mapbox.
     */
    map;

    /**
     * Tableaux des marker affiché
     */
    arrMarker = [];

    start() {
        console.log('App démarrer ...');
        // console.log("la clé d'api est :", Config.api.mapbox_gl.Api_Key);

        this.markerService = new MarkerService();

        this.initMapBox();
        this.initForm();

        this.arrMarker = this.markerService.getAll();

        if (this.arrMarker.length <= 0) return;
    }

    initMapBox() {
        // Création de la div dans le document (dans la page du site)
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        document.body.append(this.elDivMap);

        // Instancie la carte et récupere la clé api.
        mapboxGL.accessToken = Config.api.mapbox_gl.api_key;

        // Affiche la carte MapBox
        this.map =
            new mapboxGL.Map({
                attributionControl: false,
                container: this.elDivMap, // Récupération de l'identifiant du container de la map (ID : #map)
                style: Config.api.mapbox_gl.map_style.streets, // Vas récupéré dans le config le style de la carte MapBox
                center: { lng: 6.0935318, lat: 46.5975118 }, // Centre la carte au niveau de la France. 46.8789065,6.1736436,6
                zoom: 5.5, // Mais un zoom initiale de 5.
                maxZoom: 12, // Le zoom est restraint a 12 au maximum. (0 - 24) | (0 < x < 24)
                minZoom: 3 // Le zoom est restraint a 3 au minimum. (0 - 24) | (0 < x < 24)

            });
        this.map.addControl(new mapboxGL.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }
        }));
        this.map.addControl(new mapboxGL.NavigationControl({
            visualizePitch: true,
            showCompass: true, // Permet l'apparition du compas sur la carte mapbox
            showZoom: true, // Permet l'affiche sur la carte des bouton + | - pour le zoom sur la carte.
        }));

        // Crée une marque au click sur la carte
        this.map.on('click', this.mapHandlerClickMap.bind(this));
    }

    initForm() {
        // Création de la balise <form noValidate>
        this.elDivForm = document.createElement('div');
        this.elDivForm.id = 'form';

        this.elForm = document.createElement('form');
        this.elForm.noValidate = true;
        this.elForm.setAttribute('method', 'get');
        this.elForm.className = "d-flex justify-content-center flex-wrap";

        // Crée le label
        this.labelTitle = document.createElement('label');
        this.labelTitle.innerHTML = "Titre de l'evenement";
        this.labelTitle.className = "form-label";
        this.elForm.append(this.labelTitle);
        // Crée l'input
        this.elInputTitle = document.createElement('input');
        this.elInputTitle.setAttribute('type', 'text');
        this.elInputTitle.setAttribute('name', 'title');
        this.elInputTitle.setAttribute('placeholder', 'La fête de l\'ours');
        this.elInputTitle.className = "form-control w-75";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputTitle);

        // Crée le label
        this.labelDescEvent = document.createElement('label');
        this.labelDescEvent.innerHTML = "Description de l'evenement";
        this.labelDescEvent.className = "form-label"
        this.elForm.append(this.labelDescEvent);
        // Crée l'input
        this.elInputDescEvent = document.createElement('textarea');
        this.elInputDescEvent.setAttribute('name', 'description');
        this.elInputDescEvent.setAttribute('rows', 10);
        this.elInputDescEvent.setAttribute('cols', 30);
        this.elInputDescEvent.setAttribute('placeholder', 'La fête de l\’Ours, une légende ancestrale et une pure tradition catalane');
        this.elInputDescEvent.className = "form-control w-75";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputDescEvent);

        // Crée le label
        this.labelCoordLat = document.createElement('label');
        this.labelCoordLat.innerHTML = "Latitude";
        this.labelCoordLat.className = "form-label";
        this.elForm.append(this.labelCoordLat);
        // Crée l'input
        this.elInputCoordLat = document.createElement('input');
        this.elInputCoordLat.setAttribute('type', 'number');
        this.elInputCoordLat.setAttribute('name', 'lat');
        this.elInputCoordLat.setAttribute('placeholder', 'lat : 46.5975118');
        this.elInputCoordLat.className = "form-control w-50 m-2";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputCoordLat);

        // Crée l'input
        this.elInputCoordLng = document.createElement('input');
        this.elInputCoordLng.setAttribute('type', 'number');
        this.elInputCoordLng.setAttribute('name', 'lng');
        this.elInputCoordLng.setAttribute('placeholder', 'lng : 6.0935318');
        this.elInputCoordLng.className = "form-control w-50 m-2";
        // Crée le label
        this.labelCoordLng = document.createElement('label');
        this.labelCoordLng.innerHTML = "Longitude";
        this.labelCoordLng.className = "form-label";
        this.elForm.append(this.labelCoordLng);
        // L'ajoute au formulaire
        this.elForm.append(this.elInputCoordLng);

        // Crée le label
        this.labelDateDebut = document.createElement('label');
        this.labelDateDebut.innerHTML = "Date de début";
        this.labelDateDebut.className = "form-label";
        this.elForm.append(this.labelDateDebut);
        // Crée l'input
        this.elInputDateDebut = document.createElement('input');
        this.elInputDateDebut.setAttribute('type', 'date');
        this.elInputDateDebut.setAttribute('name', 'dateDebut');
        this.elInputDateDebut.className = "form-control w-75 m-2";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputDateDebut);

        // Crée le label
        this.labelDateFin = document.createElement('label');
        this.labelDateFin.innerHTML = "Date de fin";
        this.labelDateFin.className = "form-label";
        this.elForm.append(this.labelDateFin);
        // Crée l'input
        this.elInputDateFin = document.createElement('input');
        this.elInputDateFin.setAttribute('type', 'date');
        this.elInputDateFin.setAttribute('name', 'dateFin');
        this.elInputDateFin.className = "form-control w-75 m-2";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputDateFin);

        this.elDivSubmit = document.createElement('div');
        // Crée le bouton
        this.elSubmit = document.createElement('input');
        this.elSubmit.setAttribute('type', 'submit');
        this.elSubmit.setAttribute('value', 'Submit');
        this.elSubmit.className = "btn btn-outline-success";

        this.elDivSubmit.appendChild(this.elSubmit);

        this.elForm.append(this.elSubmit);
        this.elDivForm.append(this.elForm);
        document.body.append(this.elDivForm);
    }

    renderMarker() {

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
            anchor: "center",
            color: 'green', // Evenement dans plus de 3 jours.
            // color: 'orange', // Evenement dans 3 jours ou moin.
            // color: 'red' // Evenement dépassé.
        });

        const popup = new mapboxGL.Popup({
            anchor: 'center',
        })

        popup.setLngLat(evt.lngLat);
        popup.setMaxWidth('300px');
        popup.addTo(this.map);

        marker.setLngLat(evt.lngLat);
        marker.setPopup(new mapboxGL.Popup().setHTML("<p>cc tlm</p>"))
        marker.addTo(this.map);
        marker.togglePopup();
    }

    /**
     * Fonctionnalité d'ajout d'un nouveau marker
     * @param evt
     */
    handlerAddMarker(evt) {
        // On récupère le timestamp de la création
        let
            now = Date.now(),
            newTitle = this.elInputTitle.value.trim(),
            newContent = this.elInputDescEvent.value.trim();

        if (newTitle === '' || newContent === '') {
            this.elInputTitle.value
                = this.elInputDescEvent.value
                = '';

            return;
        }

        // On reconstitue un objet de données
        const newMarkerLiteral = {
            title: newTitle,
            content: newContent,
            dateCreate: now,
            dateUpdate: now
        };

        // On ajoute cet objet à la map
        this.arrMarker.push(new Marker(newMarkerLiteral));

        // Sauvegarde des données
        this.markerService.saveAll();

        // On vide le formulaire d'ajout
        this.elInputTitle.value
            = this.elInputDescEvent.value
            = '';

        // On met le focus sur le premier champ
        this.elInputTitle.focus();

        // On relance le rendu des markers
        this.renderMarker();
    }
}

const app = new App();

export default app;
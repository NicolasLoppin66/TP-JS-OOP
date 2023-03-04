// Importation de la config avec la clé d'api de mapbox et son style.
import Config from '../../app.config.json';
import 'mapbox-gl/dist/mapbox-gl.css';

// Importation du service de marker.
import {MarkerService} from './Services/MarkerService';

// Importation du style de base du site.
import '../Assets/style.css'

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
    elInputDate;

    /**
     * <input type="number"> pour l'insertion des coordonnées géographiques.
     */
    elInputCoord;

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

        this.initDom();
        this.initMapBox();

        this.arrMarker = this.markerService.getAll();

        if (this.arrMarker.length <= 0) return;


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
        this.elInputTitle.setAttribute('type', 'text');
        this.elInputTitle.setAttribute('placeholder', 'Titre');

        this.elInputDescEvent = document.createElement('textarea');
        this.elInputDescEvent.setAttribute('placeholer', 'Description');

        this.elInputDate = document.createElement('input');
        this.elInputDate.setAttribute('type', 'datetime-local');
        this.elInputDate.setAttribute('placeholder', 'Date de début');

        this.elInputDate = document.createElement('input');
        this.elInputDate.setAttribute('type', 'datetime-local');
        this.elInputDate.setAttribute('placeholder', 'Date de fin');

        this.elInputCoord = document.createElement('input');
        this.elInputCoord.setAttribute('type', 'number');

        const elBtnNewMarker = document.createElement('button');
        elBtnNewMarker.type = 'button';
        elBtnNewMarker.textContent = "Ajouter l'evenement";
        // elBtnNewMarker.addEventListener('click',)

        document.body.append(this.elDivMap);
    }

    initMapBox() {
        // Instancie la carte et récupere la clé api.
        mapboxGL.accessToken = Config.api.mapbox_gl.Api_Key;

        // Affiche la carte MapBox
        this.map =
            new mapboxGL.Map({
                attributionControl: false,
                container: this.elDivMap, // Récupération de l'identifiant du container de la map (ID : #map)
                style: Config.api.mapbox_gl.Map_Styles.streets, // Vas récupéré dans le config le style de la carte MapBox
                center: {lng: 2.2137, lat: 46.2276}, // Centre la carte au niveau de la France.
                zoom: 5, // Mais un zoom initiale de 5.
                maxZoom: 12, // Le zoom est restraint a 12 au maximum. (0 - 24)
                minZoom: 3 // Le zoom est restraint a 3 au minimum. (0 - 24)
            });
        this.map.addControl(new mapboxGL.GeolocateControl());
        this.map.addControl(new mapboxGL.NavigationControl());

        this.map.on('load', () => {
            this.map.addSource('marker', {
                // type: "geojson",
                // data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {
                            description: "Ma maison"
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [42.660957, 2.884561]
                        }
                    },
                ]
                // }
            });
            this.map.addLayer({
                'id': "marker",
                'type': "symbol",
                'source': "marker",
                "layout": {
                    'icon-image': ['get', 'icon'],
                    'icon-allow-overlap': true
                }
            });

            this.map.on('click', 'marker', (e) => {
                const coordinates
                    = e.features[0].geometry.coordinates.slice();
                const description
                    = e.features[0].properties.description;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng >
                    coordinates[0] ? 360 : -360;
                }

                this.map.popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(this.map);
            });
        })

        // Crée une marque au click sur la carte
        this.map.on('click', this.mapHandlerClickMap.bind(this));

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
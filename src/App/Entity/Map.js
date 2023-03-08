import mapboxgl from "mapbox-gl";

import Config from "../../../app.config.json"
import { ClearStorageControl } from "../Control/ClearStorageControl";

export class Map {
    map;
    evtLat;
    evtLng;
    value;

    constructor() {
        this.evtLat = document.getElementById('lat');
        this.evtLng = document.getElementById('lng');
    }

    mapInit() {
        // Création de la div dans le document (dans la page du site)
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        document.body.append(this.elDivMap);

        // Instancie la carte et récupere la clé api.
        mapboxgl.accessToken = Config.api.mapbox_gl.api_key;

        this.map = new mapboxgl.Map({
            attributionControl: false,
            container: this.elDivMap, // Récupération de l'identifiant du container de la map (ID : #map)
            style: Config.api.mapbox_gl.map_style.streets, // Vas récupéré dans le config le style de la carte MapBox
            center: { lng: 6.0935318, lat: 46.5975118 }, // Centre la carte au niveau de la France. 46.8789065,6.1736436,6
            zoom: 5.5, // Mais un zoom initiale de 5.
            maxZoom: 12, // Le zoom est restraint a 12 au maximum. (0 - 24) | (0 < x < 24)
            minZoom: 3 // Le zoom est restraint a 3 au minimum. (0 - 24) | (0 < x < 24)
        });
    }

    navigationControl() {
        const NavigationControl = new mapboxgl.NavigationControl({
            visualizePitch: true,
            showCompass: true, // Permet l'apparition du compas sur la carte mapbox
            showZoom: true, // 
        });
        this.map.addControl(NavigationControl, 'top-left')
    }

    geolocationControl() {
        const GeolocateControl = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
        });
        this.map.addControl(GeolocateControl, 'top-left')
    }

    getCoordinate() {
        this.map.on('click', (evt) => {
            // console.log(evt);
            this.evtLat.value = evt.lngLat.lat
            // console.log(evt.lngLat.lat);
            this.evtLng.value = evt.lngLat.lng
            // console.log(evt.lngLat.lng);
        });
    }

    clearStorageControl() {
        const clearStorageControl = new ClearStorageControl();
        this.map.addControl(clearStorageControl, 'top-left');
    }
}
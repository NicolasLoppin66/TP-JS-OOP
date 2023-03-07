import mapboxgl from "mapbox-gl";

import Config from "../../../app.config.json"

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
        this.map = new mapboxgl.Map({
            style: Config.api.mapbox_gl.map_style.streets, // Vas fouiller dans le ficher Config dans un systeme d'indentation.
            center: { lng: 2.2137, lat: 46.2276 }, // Centre la carte au niveau de la France.
            zoom: 5, // Mais un zoom initiale de 5.
            maxZoom: 12, // Le zoom est restraint a 12 au maximum. (0 - 24)
            minZoom: 3 // Le zoom est restraint a 3 au minimum. (0 - 24)
        });
    }

    navigationControl() {
        const NavigationControl = new mapboxgl.NavigationControl({
            visualizePitch: true,
            showCompass: true, // Permet l'apparition du compas sur la carte mapbox
            showZoom: true, // 
        });
        this.map.addControl(NavigationControl, 'bottom-right')
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
            this.evtLat.value = evt.lnhLat.lat
            this.evtLng.value = evt.lngLat.lng
        })
    }


}
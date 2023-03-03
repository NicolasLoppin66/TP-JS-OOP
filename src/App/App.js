// Importation du la config avec la clé d'api de mapbox
import Config from '../../app.config.json';
import 'mapbox-gl/dist/mapbox-gl.css';

// Importation du style de base du site
import '../Assets/style.css'

// Importation du module mapbox
import mapboxGL from 'mapbox-gl';

class App {
    /**
     * <div> de la map mapbox
     */
    elDivMap;

    /**
     * Instance de la map mapbox
     */
    map;

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

        document.body.append(this.elDivMap);
    }

    initMapBox() {
        mapboxGL.accessToken = Config.api.mapbox_gl.Api_Key;

        this.map = new mapboxGL.Map({
            container: this.elDivMap,
            style: Config.api.mapbox_gl.Map_Styles.streets,
            center: { lng: 2.2137, lat: 46.2276 },
            zoom: 5,
            maxZoom: 12,
            minZoom: 3
        });

        // Crée une marque au click sur la carte
        this.map.on('click', this.mapHandlerClickMap.bind(this));
    }

    mapHandlerClickMap(evt) {
        console.log('-----');
        console.log('lat :', evt.lngLat.lat);
        console.log('lng :', evt.lngLat.lng);
        console.log('-----');

        const marker = new mapboxGL.Marker({
            color: 'red'
        });

        marker.setLngLat(evt.lngLat);

        marker.addTo(this.map);
    }
}

const app = new App();

export default app;
export class RefreshControl {

    map;
    container;

    onAdd(map) {
        this.map = map;
        this.container = document.createElement('div');
        this.container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group');
        this.container.innerHTML = "<button type='button' class='map-control-'><span>↻</span></button>"
    }
}
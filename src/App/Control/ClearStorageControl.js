export class ClearStorageControl {
    map;
    container;

    onAdd(map) {
        this.map = map;
        this.container = document.createElement('div');
        this.container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group');
        this.container.innerHTML = '<button type="button" class="clear"><span>✖</span></button>';

        this.container.children[0].addEventListener('click', this.handlerClearStorage.bind(this));

        return this.container;
    }
}
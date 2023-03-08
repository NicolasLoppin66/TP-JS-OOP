export class ClearStorageControl {
    map;
    container;

    /**
     * Ajout d'une nouvelle fonctionnalité sur la carte mapbox, pour la suppression du cache (plus de marquer sur la map.)
     * @param {*} map 
     * @returns 
     */
    onAdd(map) {
        this.map = map;
        this.container = document.createElement('div');
        this.container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group');
        this.container.innerHTML = '<button type="button" class="clear"><span>✖</span></button>';

        this.container.children[0].addEventListener('click', this.handlerClearStorage.bind(this));

        return this.container;
    }

    /**
     * Nettoyage
     */
    onRemove() {
        this.container.removeEventListener(this.handlerClearStorage); // Suppresion des ecouteur
        this.container.remove(); // Suppression de l'élément au DOM
        this.container; // Suppression de la référence (Garbage collector vide la mémoire)
        this.map; // Suppression de la référence
    }

    /**
     * Fonction de suppresion.
     */
    handlerClearStorage() {
        localStorage.clear(); // Supprime toute les 'key === value'.
        location.reload(); // Recharge la page apres le click.
    }
}
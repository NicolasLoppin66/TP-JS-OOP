export class LocalStorageService {
    storageKey;

    /**
     * Défini la valeur.
     * @param {*} value 
     */
    set(value) {
        localStorage.setItem(this.storageKey, value);
    }

    /**
     * Donne la valeur.
     * @returns 
     */
    get() {
        return localStorage.getItem(this.storageKey);
    }

    /**
     * Efface les donnée.
     */
    clear() {
        localStorage.removeItem(this.storageKey);
    }

    /**
     * Ecrir les information au format json
     */
    setJSON() {
        this.set(JSON.parse(this.get));
    }

    /**
     * Recupére les info en format json
     * @returns 
     */
    getJSON() {
        try {
            return JSON.parse(this.get());
        } catch (e) {
            this.clear();
            return null;
        }
    }
}
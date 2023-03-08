export class LocalStorageService {
    storageKey;

    constructor(key) {
        this.storageKey = key;
    }

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
     * Recupére et donne les infos au format json
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
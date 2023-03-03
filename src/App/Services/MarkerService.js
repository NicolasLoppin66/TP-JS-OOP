export class MarkerService {
    /**
     * Crud : Read all
     */
    getAll() {
        // On mes le(s) resultat dans un tableau.
        let result = [];

        const serializedData = localStorage.getItem(STORAGE_NAME);

        try {
            // On tente des les déserialiser
            arrMarker = JSON.parse(serializedData);
        } catch (error) {
            // Si cela ne fonctionne pas (pour cause de donnée corrompus).
            // On supprime les données. 
            localStorage.removeItem(STORAGE_NAME);

            // On vide la map de marker.
            arrMarker = [];
        }

        // On récupere le tableau
        return result;
    }
}
export class Form {
    /* +++++ Element du DOM +++++ */
    elDivForm;
    elForm;

    labelTitle;
    elInputTitle;

    labelDescEvent;
    elInputDescEvent;

    labelCoordLat;
    elInputCoordLat;

    labelCoordLng;
    elInputCoordLng;

    labelDateDebut;
    elInputDateDebut;

    labelDateFin;
    elInputDateFin;

    /**
    * Création du formulaire d'insertion de marker.
    */
    initForm() {
        // Création de la balise <form noValidate>
        this.elDivForm = document.createElement('div');
        this.elDivForm.id = 'form';

        this.elForm = document.createElement('form');
        this.elForm.noValidate = true;
        this.elForm.setAttribute('method', 'get');
        this.elForm.className = "d-flex justify-content-center flex-wrap";

        // Crée le label
        this.labelTitle = document.createElement('label');
        this.labelTitle.innerHTML = "Titre de l'evenement";
        this.labelTitle.className = "form-label";
        this.elForm.append(this.labelTitle);
        // Crée l'input
        this.elInputTitle = document.createElement('input');
        this.elInputTitle.setAttribute('type', 'text');
        this.elInputTitle.setAttribute('id', 'title');
        this.elInputTitle.setAttribute('placeholder', 'La fête de l\'ours');
        this.elInputTitle.className = "form-control w-75";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputTitle);

        // Crée le label
        this.labelDescEvent = document.createElement('label');
        this.labelDescEvent.innerHTML = "Description de l'evenement";
        this.labelDescEvent.className = "form-label"
        this.elForm.append(this.labelDescEvent);
        // Crée l'input
        this.elInputDescEvent = document.createElement('textarea');
        this.elInputDescEvent.setAttribute('id', 'description');
        this.elInputDescEvent.setAttribute('rows', 10);
        this.elInputDescEvent.setAttribute('cols', 30);
        this.elInputDescEvent.setAttribute('placeholder', 'La fête de l\’Ours, une légende ancestrale et une pure tradition catalane');
        this.elInputDescEvent.className = "form-control w-75";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputDescEvent);

        // Crée le label
        this.labelCoordLat = document.createElement('label');
        this.labelCoordLat.innerHTML = "Latitude";
        this.labelCoordLat.className = "form-label";
        this.elForm.append(this.labelCoordLat);
        // Crée l'input
        this.elInputCoordLat = document.createElement('input');
        this.elInputCoordLat.setAttribute('type', 'number');
        this.elInputCoordLat.setAttribute('id', 'lat');
        this.elInputCoordLat.setAttribute('placeholder', 'lat : 46.5975118');
        this.elInputCoordLat.className = "form-control w-50 m-2";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputCoordLat);

        // Crée l'input
        this.elInputCoordLng = document.createElement('input');
        this.elInputCoordLng.setAttribute('type', 'number');
        this.elInputCoordLng.setAttribute('id', 'lng');
        this.elInputCoordLng.setAttribute('placeholder', 'lng : 6.0935318');
        this.elInputCoordLng.className = "form-control w-50 m-2";
        // Crée le label
        this.labelCoordLng = document.createElement('label');
        this.labelCoordLng.innerHTML = "Longitude";
        this.labelCoordLng.className = "form-label";
        this.elForm.append(this.labelCoordLng);
        // L'ajoute au formulaire
        this.elForm.append(this.elInputCoordLng);

        // Crée le label
        this.labelDateDebut = document.createElement('label');
        this.labelDateDebut.innerHTML = "Date de début";
        this.labelDateDebut.className = "form-label";
        this.elForm.append(this.labelDateDebut);
        // Crée l'input
        this.elInputDateDebut = document.createElement('input');
        this.elInputDateDebut.setAttribute('type', 'datetime-local');
        this.elInputDateDebut.setAttribute('id', 'dateDebut');
        this.elInputDateDebut.className = "form-control w-75 m-2";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputDateDebut);

        // Crée le label
        this.labelDateFin = document.createElement('label');
        this.labelDateFin.innerHTML = "Date de fin";
        this.labelDateFin.className = "form-label";
        this.elForm.append(this.labelDateFin);
        // Crée l'input
        this.elInputDateFin = document.createElement('input');
        this.elInputDateFin.setAttribute('type', 'datetime-local');
        this.elInputDateFin.setAttribute('id', 'dateFin');
        this.elInputDateFin.className = "form-control w-75 m-2";
        // L'ajoute au formulaire
        this.elForm.append(this.elInputDateFin);

        this.elDivSubmit = document.createElement('div');
        // Crée le bouton
        this.elSubmit = document.createElement('input');
        this.elSubmit.setAttribute('type', 'submit');
        this.elSubmit.setAttribute('id', 'submit');
        this.elSubmit.setAttribute('value', 'Submit');
        this.elSubmit.className = "btn btn-outline-success";

        this.elDivSubmit.appendChild(this.elSubmit);

        this.elForm.append(this.elSubmit);
        this.elDivForm.append(this.elForm);
        document.body.append(this.elDivForm);
    }
}
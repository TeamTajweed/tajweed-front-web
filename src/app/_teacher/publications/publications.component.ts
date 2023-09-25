import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss']
})

export class PublicationsComponent {
    isDebutantChecked = false;
    isIntermediaireChecked = false;
    isAvanceChecked = false;
    imagePath = '../../assets/images/logoInstitutTabib1.png';

    constructor() { }

     // Fonction pour mettre à jour les valeurs des cases à cocher
  updateCheckboxValues(event: Event, value: string) {
    const target = event.target as HTMLInputElement;

    if (value === 'Débutant') {
      this.isDebutantChecked = target.checked;
    } else if (value === 'Intermédiaire') {
      this.isIntermediaireChecked = target.checked;
    } else if (value === 'Avancé') {
      this.isAvanceChecked = target.checked;
    }
}
onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        // Mettez à jour le chemin de l'image avec les données de l'image téléchargée
        this.imagePath = reader.result as string;
      };
    }
}
}
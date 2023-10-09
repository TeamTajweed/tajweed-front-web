import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PublicationService } from "src/app/core/services/publication.service";

@Component({
  selector: "app-publications",
  templateUrl: "./publications.component.html",
  styleUrls: ["./publications.component.scss"],
})
export class PublicationsComponent {
  isDebutantChecked = false;
  isIntermediaireChecked = false;
  isAvanceChecked = false;
  imagePath = "../../assets/images/logoInstitutTabib1.png";
  myForm: FormGroup;

  constructor(private publicationService: PublicationService) {
    this.myForm = new FormGroup({
      title: new FormControl(""),
      level: new FormControl(""),
      message: new FormControl(""),
    });
  }

  // Fonction pour mettre à jour les valeurs des button radio
  updateCheckboxValues(event: Event, value: string) {
    const target = event.target as HTMLInputElement;

    // Reset all to false first
    this.isDebutantChecked = false;
    this.isIntermediaireChecked = false;
    this.isAvanceChecked = false;

    if (value === "Débutant" && target.checked) {
      this.isDebutantChecked = true;
    } else if (value === "Intermédiaire" && target.checked) {
      this.isIntermediaireChecked = true;
    } else if (value === "Avancé" && target.checked) {
      this.isAvanceChecked = true;
    }
  }
//fonction pour les fichier image à définir avec Yassin si besoin ou pas.
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        // Mettre à jour le chemin de l'image avec les données de l'image téléchargée
        this.imagePath = reader.result as string;
      };
    }
  }
  //soumission du formulaire de publication du professeur
  onSubmit() {
    const publicationData = {
      title: this.myForm.value.title,
      level: this.myForm.value.level,
      message: this.myForm.value.message,
    };
    this.publicationService.createPublication(this.myForm.value).subscribe();
  }
}

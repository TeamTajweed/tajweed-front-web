import { Component, Input, OnInit } from '@angular/core';
import { QuranService } from '../../core/services/quran.service';


@Component({
  selector: "app-validation",
  templateUrl: "./validation.component.html",
  styleUrls: ["./validation.component.scss"]
})
export class ValidationComponent implements OnInit {
  @Input() selectedStudent: any;
  audiosStudent: any[] = [];
  audiosTeacher: any[] = [];
  Coran: any[] = [];
  selectedSurahText: string | undefined;
  showQuran: boolean = false;
  totalSourate: boolean[][] = [];
  selectedStudentId: string | null = null;
  students: any[] = [];

  ayah: any = null;
  selectedPage: number = 1;
  selectedVerset: string = "";
  selectedSourateName: string = "";

  constructor(private quranService: QuranService) {}

  ngOnInit() {
    this.getDataQuran();
  }

  getDataQuran() {
    this.quranService.getDataQuran().subscribe((data: any) => {
      this.Coran = data.data.surahs;
      this.totalSourate = this.Coran.map((sourate) => []);
    });
  }
  showSurahText(sourate: any) {
    this.selectedSurahText = sourate.text;
  }
  toggleBackgroundColor(sourateIndex: number, ayahIndex: number) {
    if (!this.totalSourate[sourateIndex]) {
      this.totalSourate[sourateIndex] = [];
    }
    this.totalSourate[sourateIndex][ayahIndex] =
      !this.totalSourate[sourateIndex][ayahIndex];
    console.log("Numéro du verset cliqué :", ayahIndex);
  }
  // Initialisation de la fonction pour pouvoir l'importer de home component dans validation component
  showStudentCard(student: any) {}
  //fonction pour faire matcher la page saisi par l'étudiant et la page du Qur'an de l'api
  updateSelectedPage(student: any): void {
    const matchingSourate = this.Coran.find(
      (sourate) => sourate.englishName === student.sourate
    );

    if (matchingSourate) {
      this.selectedPage = matchingSourate.ayahs[0].page;
    }
  }
  //fonction pour faire matcher le verset débutant l'audio saisi par l'étudiant et les verset du Qur'an de l'api
  updateSelectVerset(student: any): void {
    const matchingVerset = this.Coran.find((sourate: any) =>
      sourate.ayahs.some(
        (ayah: any) => ayah.numberInSurah === student.DebutVerset
      )
    );

    if (matchingVerset) {
      this.selectedVerset = matchingVerset.ayahs[0];
    }
  }
  // fonction du boutton pour aller directement au verset rentrer par l'étudiant
  scrollToAnchor(verseNumber: number): void {
    const elementId = "verse" + verseNumber;
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      targetElement.scrollIntoView();
    }
  }
}

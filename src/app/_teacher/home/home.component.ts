import { Component, OnInit, ViewChild } from '@angular/core';
import {ValidationComponent} from "../../_teacher/validation/validation.component";

import {FormsModule} from "@angular/forms";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuranService } from '../../core/services/quran.service';




interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild(ValidationComponent)
  validationComponent!: ValidationComponent;
  students: any[] = [];
  selectedStudent: any;

  selectedStudentId: string | null = null;
  buttonDisplayed: boolean = false;
  displayStudentCard = false;

  constructor(private quranService: QuranService) {}

  ngOnInit() {
    this.getStudents();
  }

  //Le code commenté va etre utilisé une fois que le WS sera implémenté en attendant on mock la liste des étudiants
  //constructor(private studentService: CountryService) {}

  getStudents() {
    /*this.studentService.getListStudents().then((students) => {
          this.students = students;
          
      });*/

    this.students = [
      {
        id: "1",
        id_student: "64",
        name: "AbdAllah",
        date: "16 janvier 2023",
        audio: [1, 2, 3],
        heure: "21H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },

      {
        id: "3",
        id_student: "65",
        name: "Adam",
        date: "17 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "19H20",
        sourate: "Al-Baqara",
        DebutVerset: 200,
        FinVerset: 220,
      },
      {
        id: "4",
        id_student: "66",
        name: "Yassir",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "18H00",
        sourate: "Al-A'raaf",
        DebutVerset: 40,
        FinVerset: 60,
      },
      {
        id: "5",
        id_student: "67",
        name: "Mohammad",
        date: "20 janvier 2023",
        audio: [1, 2, 3, 4, 5],
        heure: "20H20",
        sourate: "Al-Waaqia",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "6",
        id_student: "68",
        name: "Moussa",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4],
        heure: "06H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },
      {
        id: "7",
        id_student: "70",
        name: "Dorian",
        date: "18 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        heure: "21H20",
        sourate: "Al-Hadid",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "8",
        id_student: "55",
        name: "Fadil",
        date: "20 janvier 2023",
        audio: [1, 2, 3],
        heure: "16H20",
        sourate: "Al-Insaan",
        DebutVerset: 10,
        FinVerset: 20,
      },
      {
        id: "9",
        id_student: "70",
        name: "AbdaRahman",
        date: "2 janvier 2023",
        audio: [1, 2],
        heure: "21H10",
        sourate: "Abasa",
        DebutVerset: 5,
        FinVerset: 22,
      },{
        id: "1",
        id_student: "64",
        name: "AbdAllah",
        date: "16 janvier 2023",
        audio: [1, 2, 3],
        heure: "21H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },

      {
        id: "3",
        id_student: "65",
        name: "Adam",
        date: "17 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "19H20",
        sourate: "Al-Baqara",
        DebutVerset: 200,
        FinVerset: 220,
      },
      {
        id: "4",
        id_student: "66",
        name: "Yassir",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "18H00",
        sourate: "Al-A'raaf",
        DebutVerset: 40,
        FinVerset: 60,
      },
      {
        id: "5",
        id_student: "67",
        name: "Mohammad",
        date: "20 janvier 2023",
        audio: [1, 2, 3, 4, 5],
        heure: "20H20",
        sourate: "Al-Waaqia",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "6",
        id_student: "68",
        name: "Moussa",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4],
        heure: "06H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },
      {
        id: "7",
        id_student: "70",
        name: "Dorian",
        date: "18 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        heure: "21H20",
        sourate: "Al-Hadid",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "8",
        id_student: "55",
        name: "Fadil",
        date: "20 janvier 2023",
        audio: [1, 2, 3],
        heure: "16H20",
        sourate: "Al-Insaan",
        DebutVerset: 10,
        FinVerset: 20,
      },{
        id: "1",
        id_student: "64",
        name: "AbdAllah",
        date: "16 janvier 2023",
        audio: [1, 2, 3],
        heure: "21H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },

      {
        id: "3",
        id_student: "65",
        name: "Adam",
        date: "17 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "19H20",
        sourate: "Al-Baqara",
        DebutVerset: 200,
        FinVerset: 220,
      },
      {
        id: "4",
        id_student: "66",
        name: "Yassir",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "18H00",
        sourate: "Al-A'raaf",
        DebutVerset: 40,
        FinVerset: 60,
      },
      {
        id: "5",
        id_student: "67",
        name: "Mohammad",
        date: "20 janvier 2023",
        audio: [1, 2, 3, 4, 5],
        heure: "20H20",
        sourate: "Al-Waaqia",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "6",
        id_student: "68",
        name: "Moussa",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4],
        heure: "06H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },
      {
        id: "7",
        id_student: "70",
        name: "Dorian",
        date: "18 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        heure: "21H20",
        sourate: "Al-Hadid",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "8",
        id_student: "55",
        name: "Fadil",
        date: "20 janvier 2023",
        audio: [1, 2, 3],
        heure: "16H20",
        sourate: "Al-Insaan",
        DebutVerset: 10,
        FinVerset: 20,
      },{
        id: "1",
        id_student: "64",
        name: "AbdAllah",
        date: "16 janvier 2023",
        audio: [1, 2, 3],
        heure: "21H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },

      {
        id: "3",
        id_student: "65",
        name: "Adam",
        date: "17 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "19H20",
        sourate: "Al-Baqara",
        DebutVerset: 200,
        FinVerset: 220,
      },
      {
        id: "4",
        id_student: "66",
        name: "Yassir",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "18H00",
        sourate: "Al-A'raaf",
        DebutVerset: 40,
        FinVerset: 60,
      },
      {
        id: "5",
        id_student: "67",
        name: "Mohammad",
        date: "20 janvier 2023",
        audio: [1, 2, 3, 4, 5],
        heure: "20H20",
        sourate: "Al-Waaqia",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "6",
        id_student: "68",
        name: "Moussa",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4],
        heure: "06H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },
      {
        id: "7",
        id_student: "70",
        name: "Dorian",
        date: "18 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        heure: "21H20",
        sourate: "Al-Hadid",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "8",
        id_student: "55",
        name: "Fadil",
        date: "20 janvier 2023",
        audio: [1, 2, 3],
        heure: "16H20",
        sourate: "Al-Insaan",
        DebutVerset: 10,
        FinVerset: 20,
      },{
        id: "1",
        id_student: "64",
        name: "AbdAllah",
        date: "16 janvier 2023",
        audio: [1, 2, 3],
        heure: "21H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },

      {
        id: "3",
        id_student: "65",
        name: "Adam",
        date: "17 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "19H20",
        sourate: "Al-Baqara",
        DebutVerset: 200,
        FinVerset: 220,
      },
      {
        id: "4",
        id_student: "66",
        name: "Yassir",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8],
        heure: "18H00",
        sourate: "Al-A'raaf",
        DebutVerset: 40,
        FinVerset: 60,
      },
      {
        id: "5",
        id_student: "67",
        name: "Mohammad",
        date: "20 janvier 2023",
        audio: [1, 2, 3, 4, 5],
        heure: "20H20",
        sourate: "Al-Waaqia",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "6",
        id_student: "68",
        name: "Moussa",
        date: "21 janvier 2023",
        audio: [1, 2, 3, 4],
        heure: "06H20",
        sourate: "Al-Faatiha",
        DebutVerset: 1,
        FinVerset: 7,
      },
      {
        id: "7",
        id_student: "70",
        name: "Dorian",
        date: "18 janvier 2023",
        audio: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        heure: "21H20",
        sourate: "Al-Hadid",
        DebutVerset: 7,
        FinVerset: 22,
      },
      {
        id: "8",
        id_student: "55",
        name: "Fadil",
        date: "20 janvier 2023",
        audio: [1, 2, 3],
        heure: "16H20",
        sourate: "Al-Insaan",
        DebutVerset: 10,
        FinVerset: 20,
      }
    ];
  }
  //importation  de la function updateSelectedPage de validation component pour pouvoir m'en servir dans showStudentCard
  updateSelectedPage(student: any): void {
  }
//fonction pour afficher les notififactions 
  showStudentCard(student: any) {
    if (student) {
      this.selectedStudent = student;
      this.selectedStudentId = student.id;
      this.buttonDisplayed = true;
      this.students.length;
      this.validationComponent.showStudentCard(student);
      this.validationComponent.updateSelectedPage(student);
      this.validationComponent.showQuran = false;
    } else {
      this.selectedStudent = null; // Réinitialiser la sélection d'étudiant
      this.selectedStudentId = null; //Réinitialiser l ID
      this.buttonDisplayed = true;
    }
  }

  //left-sidebar pour le responsive
  sidebarWidth: string = '90%'; // Largeur initiale du sidebar

  toggleSidebar() {
    // Bascule la largeur entre 90% et 20% à chaque clic
    this.sidebarWidth = this.sidebarWidth === '90%' ? '20%' : '90%';
  }
}
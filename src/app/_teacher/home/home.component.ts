
import { Component, OnInit, ViewChild } from '@angular/core';
import {NavbarComponent} from "../../_teacher/navbar/navbar.component";
import {ValidationComponent} from "../../_teacher/validation/validation.component";

import {FormsModule} from "@angular/forms";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuranService } from '../../quran.service';




interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    NavbarComponent,
    ValidationComponent,
    FormsModule,
    CardModule,
    ButtonModule,
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  standalone: true
})

export class HomeComponent implements OnInit {
  
  @ViewChild(ValidationComponent)
  validationComponent!: ValidationComponent;
  students: any[] = [];
  selectedStudent: any;
  selectedStudentId: string | null = null;
  buttonDisplayed: boolean = false;
  showNoStudentMessage = false;
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
          sourate:"Al faatiha",
          DebutVerset:"1",
          FinVerset:"4",
        },

        {
          id: "3",
          id_student: "65",
          name: "Adam",
          date: "17 janvier 2023",
          audio: [1, 2],
          heure: "19H20",
          sourate:"Al baqarah",
          DebutVerset:"20",
          FinVerset:"30",
        },
        {
          id: "4",
          id_student: "66",
          name: "Yassir",
          date: "21 janvier 2023",
          audio: [1, 2, 3, 4, 5, 6, 7, 8],
          heure: "18H00",
          sourate:"Al jinn",
          DebutVerset:"1",
          FinVerset:"15",
        },
        {
          id: "5",
          id_student: "67",
          name: "Mohammad",
          date: "20 janvier 2023",
          audio: [1, 2, 3, 4, 5],
          heure: "20H20",
          sourate:"Al Muzzammil",
          DebutVerset:"1",
          FinVerset:"15",
        },
        {
          id: "6",
          id_student: "68",
          name: "Moussa",
          date: "21 janvier 2023",
          audio: [1, 2, 3, 4],
          heure: "06H20",
          sourate:"Al faatiha",
          DebutVerset:"1",
          FinVerset:"7",
        },
        {
          id: "7",
          id_student: "70",
          name: "Dorian",
          date: "18 janvier 2023",
          audio: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          heure: "21H20",
          sourate:"Al falaq",
          DebutVerset:"1",
          FinVerset:"5",
        },
        {
          id: "8",
          id_student: "55",
          name: "Fadil",
          date: "20 janvier 2023",
          audio: [1, 2, 3],
          heure: "16H20",
          sourate:"Al Qariah",
          DebutVerset:"1",
          FinVerset:"7",
        },
        {
          id: "9",
          id_student: "70",
          name: "AbdaRahman",
          date: "2 janvier 2023",
          audio: [1, 2],
          heure: "21H10",
          sourate:"Al fath",
          DebutVerset:"1",
          FinVerset:"15",
        }
      ];
  }
 

showStudentCard(student: any) {
  if (student) {
    this.selectedStudent = student;
    this.selectedStudentId = student.id;
    this.buttonDisplayed = true;
    this.showNoStudentMessage = false; // Cacher le message lorsqu'un étudiant est sélectionné
    this.students.length; 
    this.validationComponent.showStudentCard(student); 
  } else {
    this.selectedStudent = null; // Réinitialiser la sélection d'étudiant
    this.selectedStudentId = null;
    this.buttonDisplayed = true;
    this.showNoStudentMessage = true; // Afficher le message lorsqu'aucun étudiant n'est sélectionné
  }
}
}
import { Component, OnInit } from '@angular/core';
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
          name: "AbdAllah",
          id: "1"
        },
        {
          name: "Adam",
          id: "2"
        },
        {
          name: "Yassir",
          id: "3"
        },
        {
          name: "Mohammad",
          id: "4"
        },
        {
          name: "Moussa",
          id: "5"
        },
        {
          name: "Dorian",
          id: "6"
        },
        {
          name: "Fadil",
          id: "7",
        },
        {
          name: "AbdaRahman",
          id: "8",
        }
      ];
  }
 

showStudentCard(student: any) {
  if (student) {
    this.selectedStudent = student;
    this.selectedStudentId = student.id;
    this.buttonDisplayed = true;
    this.showNoStudentMessage = false; // Cacher le message lorsqu'un étudiant est sélectionné
    this.students.length 
  } else {
    this.selectedStudent = null; // Réinitialiser la sélection d'étudiant
    this.selectedStudentId = null;
    this.buttonDisplayed = true;
    this.showNoStudentMessage = true; // Afficher le message lorsqu'aucun étudiant n'est sélectionné
  }
}
}
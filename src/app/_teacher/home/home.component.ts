import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ValidationComponent} from "../validation/validation.component";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

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
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CardModule,
    ButtonModule,
    CommonModule
  ],
  standalone: true
})
export class HomeComponent {
  
  students: any[] = [];

  selectedStudent: any;

  filteredStudents: any[] = [];
  //Le code commenté va etre utilisé une fois que le WS sera implémenté en attendant on mock la liste des étudiants
  //constructor(private studentService: CountryService) {}

  ngOnInit() {
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

  filterStudents(event: AutoCompleteCompleteEvent) {
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < (this.students as any[]).length; i++) {
          let student = (this.students as any[])[i];
          if (student.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(student);
          }
      }

      this.filteredStudents = filtered;
  }
  displayStudentCard = false; // Nouvelle propriété pour gérer l'affichage de la carte
  
  showNoStudentMessage = false; 

showStudentCard(student: any) {
  if (student) {
    this.selectedStudent = student;
    this.displayStudentCard = true;
    this.showNoStudentMessage = false; // Cacher le message lorsqu'un étudiant est sélectionné
  } else {
    this.selectedStudent = null; // Réinitialiser la sélection d'étudiant
    this.displayStudentCard = false; // Cacher la carte
    this.showNoStudentMessage = true; // Afficher le message lorsqu'aucun étudiant n'est sélectionné
  }
}
}
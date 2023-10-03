import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
    students: Student[] = [];

    constructor(private studentService: StudentService) { }
  
    ngOnInit() {
      this.getStudents();
    }
  
    getStudents() {
      this.studentService.getStudents().subscribe(
        students => {
          this.students = students;
          console.log(this.students); // Affichez les étudiants dans la console
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération des étudiants:', error);
        }
      );
    }
}

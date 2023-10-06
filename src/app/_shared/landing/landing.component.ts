import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../core/services/teacher.service';
import { Teacher } from '../../core/models/teacher.model';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
    teachers: Teacher[] = [];

    constructor(private teacherService: TeacherService) { }
  
    ngOnInit() {
      this.getTeachers();
    }
  
    getTeachers() {
      this.teacherService.getTeachers().subscribe(
        teachers => {
          this.teachers = teachers;
          console.log(this.teachers); // Affichez les teachers dans la console
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération des étudiants:', error);
        }
      );
    }
}

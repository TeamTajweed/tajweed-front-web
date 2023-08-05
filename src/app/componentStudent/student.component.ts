import { Component, OnInit } from "@angular/core";
import { StudentService } from "../services/student.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Student } from "../models/student.model"

@Component({
  selector: "students",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService, private http: HttpClient) { }

  ngOnInit() {
    this.performAuthorizedRequest();
  }


  private performAuthorizedRequest() {
    this.studentService.getStudents().subscribe({
      next: (response: Student[]) => {
        console.log("Réponse du backend pour students: ", response);
        this.students = response;
      },
      error: (error) => {
        console.log("Erreur lors de la requête:", error);
      }
    });

  }
}
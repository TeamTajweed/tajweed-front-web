import { Component, OnInit } from "@angular/core";
import { StudentService } from "../services/student.service";
import { HttpHeaders } from "@angular/common/http";
import { Student } from "../models/student.model"

@Component({
  selector: "app-root",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
  providers: [StudentService]
})
export class AppComponent implements OnInit {
  title = "tajweed-front-web";
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    const password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
    this.performAuthorizedRequest(password);
  }

  private createAuthorizationHeader(password: string): HttpHeaders {
    const base64Auth = btoa(`user:${password}`);
    return new HttpHeaders({
      Authorization: "Basic " + base64Auth
    });
  }

  private performAuthorizedRequest(password: string) {
    const headers = this.createAuthorizationHeader(password);
    this.studentService.getStudents({ headers }).subscribe(
      (response: Student[]) => {
        console.log("Réponse du backend pour students: ", response);
        this.students = response;
      },
      (error) => {
        console.log("Erreur lors de la requête:", error);
      }
    );
  }
}
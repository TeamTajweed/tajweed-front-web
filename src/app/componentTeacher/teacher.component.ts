import { Component, OnInit } from "@angular/core";
import { TeacherService } from "../services/teacher.service";
import { HttpHeaders } from "@angular/common/http";
import { Teacher } from "../models/teacher.model";

@Component({
  selector: "teachers",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"],
  providers: [TeacherService]
})
export class TeacherComponent implements OnInit {
  
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

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
    this.teacherService.getTeachers({ headers }).subscribe(
      (response: Teacher[]) => {
        console.log("Réponse du backend pour teachers: ", response);
        this.teachers = response;
      },
      (error) => {
        console.log("Erreur lors de la requête:", error);
      }
    );
  }
}
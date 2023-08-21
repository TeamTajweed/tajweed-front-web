import {Component, inject, OnInit} from "@angular/core";
import { TeacherService } from "../../../core/services/teacher.service";
import { HttpHeaders } from "@angular/common/http";
import { Teacher } from "../../../core/models/teacher.model";
import {Observable, take} from "rxjs";

@Component({
  selector: "teachers",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"],
  standalone: true,
  providers: [TeacherService]
})
export class TeacherComponent implements OnInit {
  
  teachers: Teacher[] = [];
  password: string;
  headers: HttpHeaders;
  private teacherService: TeacherService = inject(TeacherService);
  //TODO: Faire fonctionner la syntaxe suivante et n'utiliez qu'elle pour appeler les services GET-ALL
  //getAllTeachers$: Observable<Teacher[]> = this.teacherService.getTeachers();
  //getTeacherById$: Observable<Teacher> = this.teacherService.getTeacherById(id: number);
constructor() {
  this.password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
  this.headers = this.createAuthorizationHeader(this.password);
}

  ngOnInit() {
    this.password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
    this.headers = this.createAuthorizationHeader(this.password);
  }

  private createAuthorizationHeader(password: string): HttpHeaders {
    const base64Auth = btoa(`user:${password}`);
    return new HttpHeaders({
      Authorization: "Basic " + base64Auth
    });
  }

  private performAuthorizedRequest(password: string) {
    const headers = this.createAuthorizationHeader(password);
    //TODO: Check

    // this.teacherService.getTeachers({ headers }).subscribe(
    //   (response: Teacher[]) => {
    //     this.teachers = response;
    //   }
    // );
  }
}
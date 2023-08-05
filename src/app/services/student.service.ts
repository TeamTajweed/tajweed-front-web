import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly API_URL = "http://localhost:8080/api";
  readonly ENDPOINT_STUDENTS = "/students";

  constructor(private httpClient: HttpClient) { }

  getStudents(options?: { headers?: HttpHeaders }): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.API_URL + this.ENDPOINT_STUDENTS, options);

  }
}












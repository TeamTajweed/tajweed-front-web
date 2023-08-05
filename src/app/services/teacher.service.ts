import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  readonly API_URL = "http://localhost:8080/api";
  readonly ENDPOINT_TEACHERS = "/teachers";

  constructor(private httpClient: HttpClient) { }

  getTeachers(options?: { headers?: HttpHeaders }): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.API_URL + this.ENDPOINT_TEACHERS, options);
  }
}

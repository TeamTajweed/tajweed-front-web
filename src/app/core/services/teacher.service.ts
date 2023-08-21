import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Teacher } from '../models/teacher.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  readonly API_URL = "http://localhost:8080";
  readonly ENDPOINT_TEACHERS = "/teachers";

  constructor(private httpClient: HttpClient) { }
 
  getTeachers(options?: { headers?: HttpHeaders }): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.API_URL + this.ENDPOINT_TEACHERS, options); 
  }
}

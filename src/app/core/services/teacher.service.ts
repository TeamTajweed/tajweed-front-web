import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Teacher } from '../models/teacher.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly API_URL: string = "http://localhost:8080";
  private readonly ENDPOINT_TEACHERS:string = "/teachers";

  httpClient: HttpClient = inject(HttpClient);
 
  getTeachers(options?: { headers?: HttpHeaders }): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.API_URL + this.ENDPOINT_TEACHERS, options);
  }
}

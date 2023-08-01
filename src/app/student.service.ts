import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly API_URL = "http://localhost:8080";
  readonly ENDPOINT_STUDENTS = "/students";

  constructor(private httpClient: HttpClient) { }

  
  getStudents(): Observable<any[]> {
    console.log("requete ok")
    return this.httpClient.get<any[]>(this.API_URL + this.ENDPOINT_STUDENTS);
  }
}











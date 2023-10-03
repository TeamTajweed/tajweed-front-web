import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Institute } from '../models/institute.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  readonly API_URL = "http://localhost:3000";
  readonly ENDPOINT_INSTITUTES = "/institute";


  constructor(private httpClient: HttpClient) { }

  getInstitutes(options?: { headers?: HttpHeaders }): Observable<Institute[]> {
    return this.httpClient.get<Institute[]>(this.API_URL + this.ENDPOINT_INSTITUTES, options);
  }
}

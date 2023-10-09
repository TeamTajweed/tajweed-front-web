import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Progression } from '../models/progression.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgressionService {
  private readonly API_URL: string = "http://localhost:3000";
  private readonly ENDPOINT_PROGRESSIONS:string = "/PROGRESSION";

  httpClient: HttpClient = inject(HttpClient);
 
  getProgressions(options?: { headers?: HttpHeaders }): Observable<Progression[]> {
    return this.httpClient.get<Progression[]>(this.API_URL + this.ENDPOINT_PROGRESSIONS, options);
  }
}

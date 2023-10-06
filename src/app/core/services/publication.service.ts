import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Publication } from '../models/publication.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  readonly API_URL = "http://localhost:3000";
  readonly ENDPOINT_PUBLICATIONS = "/publications";



  constructor(private httpClient: HttpClient) { }

  getPublications(options?: { headers?: HttpHeaders }): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(this.API_URL + this.ENDPOINT_PUBLICATIONS, options);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Entity } from '../models/entity.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  readonly API_URL = "http://localhost:8080/api";
  readonly ENDPOINT_ENTITYS = "/entities";

  constructor(private httpClient: HttpClient) { }

  getEntities(options?: { headers?: HttpHeaders }): Observable<Entity[]> {
    return this.httpClient.get<Entity[]>(this.API_URL + this.ENDPOINT_ENTITYS, options);
  }
}


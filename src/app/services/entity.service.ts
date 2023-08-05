import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity.model';

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


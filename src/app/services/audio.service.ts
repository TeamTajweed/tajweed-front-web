import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Audio } from '../models/audio.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  readonly API_URL = "http://localhost:8080/api";
  readonly ENDPOINT_AUDIOS = "/audios";

  constructor(private httpClient: HttpClient) { }


  getAudios(options?: { headers?: HttpHeaders }): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>(this.API_URL + this.ENDPOINT_AUDIOS, options);
  }
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Audio } from '../models/audio.model';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
//à finir controller coter back
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  readonly API_URL = "http://localhost:3000";
  readonly ENDPOINT_AUDIOS = "/audios";
<<<<<<< HEAD

=======
>>>>>>> 97ceacaa (home page dynamic with backend)

  constructor(private httpClient: HttpClient) { }

  
  getAudios(options?: { headers?: HttpHeaders }): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>(this.API_URL + this.ENDPOINT_AUDIOS, options);
  }

  getAudiosByStudentId(studentId: number): Observable<Audio[]> {
    const headers = new HttpHeaders();
    const url = `${this.API_URL}/audios?studentId=${studentId}`;
  
    return this.httpClient.get<Audio[]>(url, { headers }).pipe(
      map(audios => {
        // Filtrer les notifications pour obtenir seulement celles qui correspondent à studentId
        return audios.filter(audio => audio.idStudent === studentId);
      })
    );
  } 
}



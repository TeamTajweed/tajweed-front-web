import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { TraceAudio } from '../models/traceAudio.model';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TraceAudioService {

  readonly API_URL = "http://localhost:3000";
  readonly ENDPOINT_NOTIFICATIONS = "/traceAudio";



  constructor(private httpClient: HttpClient) { }
  
  
 // Récupérer tous les TraceAudio
 getAllTraceAudios(): Observable<TraceAudio[]> {
  return this.httpClient.get<TraceAudio[]>(`${this.API_URL}${this.ENDPOINT_NOTIFICATIONS}`);
}

// Récupérer un TraceAudio par ID
getTraceAudioById(id: number): Observable<TraceAudio> {
  return this.httpClient.get<TraceAudio>(`${this.API_URL}${this.ENDPOINT_NOTIFICATIONS}/${id}`);
}

// Créer un nouveau TraceAudio
createTraceAudio(traceAudio: TraceAudio): Observable<TraceAudio> {
  return this.httpClient.post<TraceAudio>(`${this.API_URL}${this.ENDPOINT_NOTIFICATIONS}`, traceAudio);
}

// Mettre à jour un TraceAudio
updateTraceAudio(id: number, updatedData: any): Observable<TraceAudio> {
  return this.httpClient.put<TraceAudio>(`${this.API_URL}${this.ENDPOINT_NOTIFICATIONS}/${id}`, updatedData);
}

// Supprimer un TraceAudio par ID
deleteTraceAudioById(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.API_URL}${this.ENDPOINT_NOTIFICATIONS}/${id}`);
}

getTraceAudiosByDateRangeAndStudent(dateDebut: string, dateFin: string, studentId: number): Observable<TraceAudio[]> {
  return this.httpClient.get<TraceAudio[]>(`${this.API_URL}${this.ENDPOINT_NOTIFICATIONS}?dateDebut=${dateDebut}&dateFin=${dateFin}&studentId=${studentId}`);
}
getTraceAudiosByDateRange(dateDebut: string, dateFin: string): Observable<TraceAudio[]> {
  return this.httpClient.get<TraceAudio[]>(`${this.API_URL}${this.ENDPOINT_NOTIFICATIONS}?dateDebut=${dateDebut}&dateFin=${dateFin}`);
}
}
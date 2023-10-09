import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Notification } from '../models/notification.model';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly API_URL = "http://localhost:3000";
  readonly ENDPOINT_NOTIFICATIONS = "/notifications";



  constructor(private httpClient: HttpClient) { }
  
  getNotifications(options?: { headers?: HttpHeaders }): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(this.API_URL + this.ENDPOINT_NOTIFICATIONS, options);
  
  }

  getNotificationsByStudentId(studentId: number): Observable<Notification[]> {
    const headers = new HttpHeaders();
    const url = `${this.API_URL}/notifications?studentId=${studentId}`;
  
    return this.httpClient.get<Notification[]>(url, { headers }).pipe(
      map(notifications => {
        // Filtrer les notifications pour obtenir seulement celles qui correspondent à studentId
        return notifications.filter(notification => notification.idStudent === studentId);
      })
    );
  }
  
}

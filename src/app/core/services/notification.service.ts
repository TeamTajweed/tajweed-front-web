import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Notification } from '../models/notification.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly API_URL = "http://localhost:3000";
  readonly ENDPOINT_NOTIFICATIONS = "/NOTIFICATION";

  constructor(private httpClient: HttpClient) { }
  
  getNotifications(options?: { headers?: HttpHeaders }): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(this.API_URL + this.ENDPOINT_NOTIFICATIONS, options);
  
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuranService {

  constructor(private http: HttpClient) { }

  getDataQuran(): Observable<any> {
    const apiUrl = 'http://api.alquran.cloud/v1/quran/quran-uthmani';
    return this.http.get(apiUrl);
  }
}


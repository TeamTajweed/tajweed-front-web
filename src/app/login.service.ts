import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  login(email: string, password: string): Observable<User> {
    let req = this.http.post<User>('http://localhost:8080/api/auth/signin', {
      email: email,
      password: password
    }).pipe(shareReplay());
    req.subscribe
      ({
        next: (user) => this.user$.next(user)
      });
    return req;
  }
}

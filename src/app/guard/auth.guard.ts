import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';
@Injectable(
  { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {
  constructor(public auth: LoginService, public router: Router) { }
  canActivate(): boolean {
    if (this.auth.user$.value == null) {
      console.log("not logged in")
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
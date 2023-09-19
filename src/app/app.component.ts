import { Component, OnInit } from "@angular/core";
import 'flowbite';
import { User } from "./core/models/user.model";
import { AccountService } from "./core/services/account.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  title = "tajweed-front-web";
  user: User | null | undefined;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
  
  logout(){
    this.accountService.logout();
  }
  isLoggedAsTeacher = false;
  isLoggedAsStudent = true;
  
}











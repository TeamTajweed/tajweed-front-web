import { Component, OnInit } from "@angular/core";
import 'flowbite';
import { User } from "./core/models/user.model";
import { AccountService } from "./core/services/account.service";
import { Subscription } from "rxjs";
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  title = "tajweed-front-web";
  user: User | null | undefined;
  subscription: Subscription | undefined;
  isLogged = false;
  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
    this.subscription = this.accountService.getUserStatus().subscribe(result => {
      this.isLogged = result != null;
    })
  }
  ngOnInit(): void {
    initFlowbite();
  }
  logout(){
    this.accountService.logout();
  }
  isLoggedAsTeacher = false;
  isLoggedAsStudent = true;
  
}
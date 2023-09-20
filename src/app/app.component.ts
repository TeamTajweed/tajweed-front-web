import { Component, OnInit } from "@angular/core";
import 'flowbite';
import { User } from "./core/models/user.model";
import { AccountService } from "./core/services/account.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
  title = "tajweed-front-web";
  user: User | null | undefined;
  test = false;
  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
  
  logout(){
    this.accountService.logout();
  }

  isLoggedAsTeacher = false;
  isLoggedAsStudent = true;

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
        // Subscribe to the observable
        this.accountService._sessionDisable.subscribe((boolean) => {
          this.test = boolean;
        });
  }
  
}











import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StudentService]
})
export class AppComponent implements OnInit {
  title = 'tajweed-front-web';
  students: any[] = []; 

  constructor(private studentService: StudentService, private httpClient: HttpClient) { }

  ngOnInit() {

    //A REMPLACER PAR LA CHAINE GENEREE PAR LE BACK DEMANDER A ABD AR RAHMAN SI BESOIN
    const password = '14ad7230-e45b-4e83-9c74-3c35317a4978';

    
    this.performAuthorizedRequest(password);
  }

  private createAuthorizationHeader(password: string): HttpHeaders {
    const base64Auth = btoa(`user:${password}`);
    return new HttpHeaders({
      'Authorization': 'Basic ' + base64Auth
    });
  }

  private performAuthorizedRequest(password: string) {
    const headers = this.createAuthorizationHeader(password);
    const url = 'http://localhost:8080/students'; 
    this.httpClient.get(url, { headers, responseType: 'json' }).subscribe(
      (response: any) => {
        console.log('Réponse du backend:', response); 
        this.students = response as any[]; 
      },
      (error) => {
        console.log('Erreur lors de la requête:', error);
      }
    );
  }
}







import { Component, OnInit } from "@angular/core";
import { StudentService } from "./services/student.service";
import { HttpHeaders } from "@angular/common/http";
import { Student } from "./models/student.model"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [StudentService]
})
export class AppComponent implements OnInit {
  title = "tajweed-front-web";
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    const password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
    this.performAuthorizedRequest(password);
  }

  private createAuthorizationHeader(password: string): HttpHeaders {
    const base64Auth = btoa(`user:${password}`);
    return new HttpHeaders({
      Authorization: "Basic " + base64Auth
    });
  }

  private performAuthorizedRequest(password: string) {
    const headers = this.createAuthorizationHeader(password);
    this.studentService.getStudents({ headers }).subscribe(
      (response: Student[]) => {
        console.log("Réponse du backend pour students: ", response);
        this.students = response;
      },
      (error) => {
        console.log("Erreur lors de la requête:", error);
      }
    );
  }
}




// import { Component, OnInit } from "@angular/core";
// import { TeacherService } from "./services/teacher.service";
// import { HttpHeaders } from "@angular/common/http";
// import { Teacher } from "./models/teacher.model";

// @Component({
//   selector: "app-root",
//   templateUrl: "./app.component.html",
//   styleUrls: ["./app.component.scss"],
//   providers: [TeacherService]
// })
// export class AppComponent implements OnInit {
//   title = "tajweed-front-web";
//   teachers: Teacher[] = [];

//   constructor(private teacherService: TeacherService) {}

//   ngOnInit() {
//     const password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
//     this.performAuthorizedRequest(password);
//   }

//   private createAuthorizationHeader(password: string): HttpHeaders {
//     const base64Auth = btoa(`user:${password}`);
//     return new HttpHeaders({
//       Authorization: "Basic " + base64Auth
//     });
//   }

//   private performAuthorizedRequest(password: string) {
//     const headers = this.createAuthorizationHeader(password);
//     this.teacherService.getTeachers({ headers }).subscribe(
//       (response: Teacher[]) => {
//         console.log("Réponse du backend pour teachers: ", response);
//         this.teachers = response;
//       },
//       (error) => {
//         console.log("Erreur lors de la requête:", error);
//       }
//     );
//   }
// }


// import { Component, OnInit } from "@angular/core";
// import { AudioService } from "./services/audio.service";
// import { HttpHeaders } from "@angular/common/http";
// import { Audio } from "./models/audio.model";

// @Component({
//   selector: "app-root",
//   templateUrl: "./app.component.html",
//   styleUrls: ["./app.component.scss"],
//   providers: [AudioService]
// })
// export class AppComponent implements OnInit {
//   title = "tajweed-front-web";
//   audios: Audio[] = [];

//   constructor(private audioService: AudioService) {}

//   ngOnInit() {
//     const password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
//     this.performAuthorizedRequest(password);
//   }

//   private createAuthorizationHeader(password: string): HttpHeaders {
//     const base64Auth = btoa(`user:${password}`);
//     return new HttpHeaders({
//       Authorization: "Basic " + base64Auth
//     });
//   }

//   private performAuthorizedRequest(password: string) {
//     const headers = this.createAuthorizationHeader(password);
//     this.audioService.getAudios({ headers }).subscribe(
//       (response: Audio[]) => {
//         console.log("Réponse du backend pour audios: ", response);
//         this.audios = response;
//       },
//       (error) => {
//         console.log("Erreur lors de la requête:", error);
//       }
//     );
//   }
// }



// import { Component, OnInit } from "@angular/core";
// import { EntityService } from "./services/entity.service";
// import { HttpHeaders } from "@angular/common/http"; 
// import { Entity } from "./models/entity.model";

// @Component({
//   selector: "app-root",
//   templateUrl: "./app.component.html",
//   styleUrls: ["./app.component.scss"],
//   providers: [EntityService],
// })
// export class AppComponent implements OnInit {
//   title = "tajweed-front-web";
//   entities: Entity[] = [];

//   constructor(private entityService: EntityService) {}

//   ngOnInit() {
//     const password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
//     this.performAuthorizedRequest(password);
//   }

//   private createAuthorizationHeader(password: string): HttpHeaders {
//     const base64Auth = btoa(`user:${password}`);
//     return new HttpHeaders({
//       Authorization: "Basic " + base64Auth,
//     });
//   }

//   private performAuthorizedRequest(password: string) {
//     const headers = this.createAuthorizationHeader(password);
//     this.entityService.getEntities({ headers }).subscribe(
//       (response: Entity[]) => {
//         console.log("Réponse du backend pour entities: ", response);
//         this.entities = response;
//       },
//       (error) => {
//         console.log("Erreur lors de la requête:", error);
//       }
//     );
//   }
// }


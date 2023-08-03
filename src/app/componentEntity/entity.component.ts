
import { Component, OnInit } from "@angular/core";
import { EntityService } from "../services/entity.service";
import { HttpHeaders } from "@angular/common/http"; 
import { Entity } from "../models/entity.model";

@Component({
  selector: "app-root",
  templateUrl: "./entity.component.html",
  styleUrls: ["./entity.component.scss"],
  providers: [EntityService],
})
export class AppComponent implements OnInit {
  title = "tajweed-front-web";
  entities: Entity[] = [];

  constructor(private entityService: EntityService) {}

  ngOnInit() {
    const password = "a2086833-13ae-4ecb-802b-c12ac3870d4b";
    this.performAuthorizedRequest(password);
  }

  private createAuthorizationHeader(password: string): HttpHeaders {
    const base64Auth = btoa(`user:${password}`);
    return new HttpHeaders({
      Authorization: "Basic " + base64Auth,
    });
  }

  private performAuthorizedRequest(password: string) {
    const headers = this.createAuthorizationHeader(password);
    this.entityService.getEntities({ headers }).subscribe(
      (response: Entity[]) => {
        console.log("Réponse du backend pour entities: ", response);
        this.entities = response;
      },
      (error) => {
        console.log("Erreur lors de la requête:", error);
      }
    );
  }
}


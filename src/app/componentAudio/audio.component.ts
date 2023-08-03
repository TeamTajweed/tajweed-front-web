
import { Component, OnInit } from "@angular/core";
import { AudioService } from "../services/audio.service";
import { HttpHeaders } from "@angular/common/http";
import { Audio } from "../models/audio.model";

@Component({
  selector: "app-root",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"],
  providers: [AudioService]
})
export class AppComponent implements OnInit {
  title = "tajweed-front-web";
  audios: Audio[] = [];

  constructor(private audioService: AudioService) {}

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
    this.audioService.getAudios({ headers }).subscribe(
      (response: Audio[]) => {
        console.log("Réponse du backend pour audios: ", response);
        this.audios = response;
      },
      (error) => {
        console.log("Erreur lors de la requête:", error);
      }
    );
  }
}
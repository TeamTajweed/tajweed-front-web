
import { Component, OnInit } from "@angular/core";
import { AudioService } from "../../../core/services/audio.service";
import { HttpHeaders } from "@angular/common/http";
import { Audio } from "../../../core/models/audio.model";

@Component({
  selector: "audios",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"],
  standalone: true,
  providers: [AudioService]
})
export class AudioComponent implements OnInit {
  
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
import { Component } from '@angular/core';
import {NavbarComponent} from "../core/layout/navbar/navbar.component";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
  imports: [
    NavbarComponent
  ],
  standalone: true
})
export class StatistiquesComponent {

}

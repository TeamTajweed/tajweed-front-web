import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
    imports: [
        NavbarComponent
    ],
    standalone: true
})
export class PublicationsComponent {

}

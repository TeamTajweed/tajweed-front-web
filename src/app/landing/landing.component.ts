import { Component } from '@angular/core';
import {NavbarComponent} from "../core/layout/navbar/navbar.component";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    imports: [
        NavbarComponent
    ],
    standalone: true
})
export class LandingComponent {

}

import { Component } from '@angular/core';
import {NavbarComponent} from "../../_teacher/navbar/navbar.component";
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    imports: [
        NavbarComponent,
        ButtonModule
    ],
    standalone: true
})
export class LandingComponent {

}

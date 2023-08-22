import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from "@angular/common";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
    standalone: true
})
export class NavbarComponent {
    
    currentPage!: string; // Utilisation de l'opérateur de non-nullabilité

    constructor(private router: Router) { }

    ngOnInit(): void {
        // Obtenez le nom du composant en cours
        this.currentPage = this.router.url.split('/').pop() || ''; // Utilisation de '||' pour une valeur par défaut
    }
}

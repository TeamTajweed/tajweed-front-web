import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    
    currentPage!: string; // Utilisation de l'opérateur de non-nullabilité

    constructor(private router: Router) { }

    ngOnInit(): void {
        // Obtenez le nom du composant en cours
        this.currentPage = this.router.url.split('/').pop() || ''; // Utilisation de '||' pour une valeur par défaut
    }
}

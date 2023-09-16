import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from "@angular/common";
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [
        NgIf,
        RouterLink,
        RouterLinkActive,
        MenubarModule,
        ButtonModule,
        CommonModule
    ],
    standalone: true
})
export class NavbarComponent {
    items: MenuItem[] | undefined;
    isConnected = false;
    router: Router = inject(Router);
    ngOnInit() {
        if(this.router.url===`/home`){
            this.items = [
                {
                    label: 'Accueil',
                    icon: 'pi pi-fw pi-file',
                    
                },
                {
                    label: 'Publications',
                    icon: 'pi pi-fw pi-pencil',
                    
                },
                {
                    label: 'Statistiques',
                    icon: 'pi pi-fw pi-user',
                    
                },           
            ];
            this.isConnected=true;
        }
    }
}

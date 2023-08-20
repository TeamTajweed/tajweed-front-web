import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component'; 
import { HomeComponent } from './views/home/home.component';
import { ValidationComponent } from './layout/validation/validation.component';
import { StatistiquesComponent } from './views/statistiques/statistiques.component';
import { PublicationsComponent } from './views/publications/publications.component';
import { LandingComponent } from './views/landing/landing.component';


export const routerConfig: Routes = [
  { path: 'landing', component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'validation', component: ValidationComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ValidationComponent } from './core/layout/validation/validation.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { PublicationsComponent } from './publications/publications.component';
import { LandingComponent } from './landing/landing.component';


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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_shared/login/login.component';
import { HomeComponent } from './_teacher/home/home.component';
import { ValidationComponent } from './_teacher/validation/validation.component';
import { StatistiquesComponent } from './_teacher/statistiques/statistiques.component';
import { PublicationsComponent } from './_teacher/publications/publications.component';
import { LandingComponent } from './_shared/landing/landing.component';
import { HomestudentsComponent } from './_students/homestudents/homestudents.component';
import { FeedstudentsComponent } from './_students/feedstudents/feedstudents.component';
import { StatsstudentsComponent } from './_students/statsstudents/statsstudents.component';


export const routerConfig: Routes = [
  { path: 'landing', component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'validation', component: ValidationComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'homestudents', component: HomestudentsComponent },
  { path: 'statsstudents', component: StatsstudentsComponent },
  { path: 'feedstudents', component: FeedstudentsComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

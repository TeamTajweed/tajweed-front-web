import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_shared/login/login.component';
import { HomeComponent } from './_teacher/home/home.component';
import { StatistiquesComponent } from './_teacher/statistiques/statistiques.component';
import { PublicationsComponent } from './_teacher/publications/publications.component';
import { LandingComponent } from './_shared/landing/landing.component';
import { HomestudentsComponent } from './_students/homestudents/homestudents.component';
import { FeedstudentsComponent } from './_students/feedstudents/feedstudents.component';
import { StatsstudentsComponent } from './_students/statsstudents/statsstudents.component';


export const routerConfig: Routes = [
  //Not logged avaibles routes
  { path: 'landing', component: LandingComponent},
  { path: 'login', component: LoginComponent },
    //Logged as teacher routes
  { path: 'homeTeacher', component: HomeComponent },
  { path: 'shareContent', component: PublicationsComponent },
  { path: 'searchProfiles', component: StatistiquesComponent },
  //Logged as student routes
  { path: 'homeStudent', component: HomestudentsComponent },
  { path: 'profile', component: StatsstudentsComponent },
  { path: 'feed', component: FeedstudentsComponent },
  //WildCards
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
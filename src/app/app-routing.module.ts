import { AboutAppComponent } from './_shared/about-app/about-app.component';
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
import { HiddenComponent } from './_students/hidden/hidden.component';
import { SigninComponent } from './_shared/signin/signin.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { AboutusComponent } from './_shared/aboutus/aboutus.component';


export const routerConfig: Routes = [
  //Not logged avaibles routes
  { path: 'landing', component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SigninComponent },
  { path: 'aboutUs', component: AboutusComponent },
  { path: 'aboutApp', component: AboutAppComponent },
    //Logged as teacher routes
  { path: 'homeTeacher', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'shareContent', component: PublicationsComponent, canActivate: [AuthGuard]  },
  { path: 'searchProfiles', component: StatistiquesComponent, canActivate: [AuthGuard]  },
  //Logged as student routes
  { path: 'homeStudent', component: HomestudentsComponent, canActivate: [AuthGuard]  },
  { path: 'profile', component: StatsstudentsComponent, canActivate: [AuthGuard]  },
  { path: 'feed', component: FeedstudentsComponent, canActivate: [AuthGuard]  },
  { path: 'hidden', component: HiddenComponent, canActivate: [AuthGuard]  },
  //WildCards
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
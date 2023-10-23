import { AccountService } from './core/services/account.service';
import { StatistiquesComponent } from './_teacher/statistiques/statistiques.component';
import { PublicationsComponent } from './_teacher/publications/publications.component';
import { HomeComponent } from './_teacher/home/home.component';
import { LoginComponent } from './_shared/login/login.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomestudentsComponent } from './_students/homestudents/homestudents.component';
import { FeedstudentsComponent } from './_students/feedstudents/feedstudents.component';
import { StatsstudentsComponent } from './_students/statsstudents/statsstudents.component';
import { AudioRecordingService } from './core/services/audio.recording.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HiddenComponent } from './_students/hidden/hidden.component';
import { FakeBackendInterceptor } from './core/helpers/fakeBackend';
import { AlertComponent } from './_shared/alert/alert.component';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './_shared/signin/signin.component';
import { LandingComponent } from './_shared/landing/landing.component';
import { ValidationComponent } from './_teacher/validation/validation.component';
import { AboutAppComponent } from './_shared/about-app/about-app.component';
import { DonutComponent } from './_teacher/donut/donut.component';
import { ChartModule } from 'primeng/chart';
import { AutoCompleteModule } from 'primeng/autocomplete';




@NgModule({
  declarations: [
    AppComponent,
    HomestudentsComponent,
    FeedstudentsComponent,
    StatsstudentsComponent,
    HiddenComponent,
    AlertComponent,
    LoginComponent,
    SigninComponent,
    LandingComponent,
    HomeComponent,
    PublicationsComponent,
    StatistiquesComponent,
    ValidationComponent,
    AboutAppComponent,
    DonutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ChartModule,
    AutoCompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AudioRecordingService,     
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true},
    AccountService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


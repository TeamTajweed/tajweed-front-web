import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './_teacher/home/home.component';
import { HomestudentsComponent } from './_students/homestudents/homestudents.component';
import { FeedstudentsComponent } from './_students/feedstudents/feedstudents.component';
import { StatsstudentsComponent } from './_students/statsstudents/statsstudents.component';
import { NavbarstudentsComponent } from './_students/navbarstudents/navbarstudents.component';
import { AudioRecordingService } from './core/services/audio-recording.service';
import { FormsModule } from '@angular/forms';
import { HiddenComponent } from './_students/hidden/hidden.component';


@NgModule({
  declarations: [AppComponent, HomestudentsComponent, FeedstudentsComponent, StatsstudentsComponent, NavbarstudentsComponent, HiddenComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AudioRecordingService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


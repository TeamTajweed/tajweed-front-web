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


@NgModule({
  declarations: [AppComponent, HomestudentsComponent, FeedstudentsComponent, StatsstudentsComponent, HiddenComponent, AlertComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AudioRecordingService,     
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


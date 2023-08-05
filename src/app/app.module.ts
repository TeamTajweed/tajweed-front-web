import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule} from 'primeng/button';
import { AudioComponent } from './componentAudio/audio.component';
import { EntityComponent } from './componentEntity/entity.component';
import { TeacherComponent } from './componentTeacher/teacher.component';
import { StudentComponent } from './componentStudent/student.component';
import { AuthInterceptor } from './interceptos/auth.interceptor';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    EntityComponent,
    TeacherComponent,
    StudentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


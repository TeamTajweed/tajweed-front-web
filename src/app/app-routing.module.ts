import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StudentComponent } from './componentStudent/student.component';
import { AuthGuard } from './guard/auth.guard';
import { AudioComponent } from './componentAudio/audio.component';
import { TeacherComponent } from './componentTeacher/teacher.component';
import { EntityComponent } from './componentEntity/entity.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'students', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'audios', component: AudioComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: TeacherComponent, canActivate: [AuthGuard] },
  { path: 'entity', component: EntityComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

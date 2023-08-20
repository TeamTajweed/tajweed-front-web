import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule} from 'primeng/button';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component'; 
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ValidationComponent } from './layout/validation/validation.component';
import { StatistiquesComponent } from './views/statistiques/statistiques.component';
import { PublicationsComponent } from './views/publications/publications.component';
import { ChartModule } from 'primeng/chart';
import { VerticalBarStatistiqueComponent } from './layout/vertical-bar-statistique/vertical-bar-statistique.component';
import { CircularStatisticalGraphicComponent } from './layout/circular-statistical-graphic/circular-statistical-graphic.component';
import { LineStatisticalGraphicComponent } from './layout/line-statistical-graphic/line-statistical-graphic.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './views/signin/signin.component';
import { LandingComponent } from './views/landing/landing.component';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,  
    NavbarComponent,
    ValidationComponent,
    StatistiquesComponent,
    VerticalBarStatistiqueComponent,
    CircularStatisticalGraphicComponent,
    LineStatisticalGraphicComponent,
    PublicationsComponent,
    SigninComponent,
    LandingComponent,
    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    FormsModule,
    DropdownModule,
    ChartModule,
    FormsModule,  
    MatAutocompleteModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    AutoCompleteModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


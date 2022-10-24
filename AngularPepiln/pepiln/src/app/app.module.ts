import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RegisterComponent } from './componentes/register/register.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { Router } from "@angular/router";
import { HomeComponent } from './componentes/home/home.component';
import { SiginGoogleComponent } from './componentes/sigin-google/sigin-google.component';
import { SigninMicrosoftComponent } from './componentes/signin-microsoft/signin-microsoft.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    SiginGoogleComponent,
    SigninMicrosoftComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{path: 'register', component: RegisterComponent}, {path: 'login', component:LoginComponent}, 
                          {path: 'dashboard', component:DashboardComponent}, {path: 'home', component:HomeComponent},
                          {path: 'signin-google', component:SiginGoogleComponent}, {path: 'signin-microsoft', component:SigninMicrosoftComponent}]),
                          
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

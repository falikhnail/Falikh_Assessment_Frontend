import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Impor routing module
import { HttpClientModule } from '@angular/common/http';  // Impor HttpClientModule untuk HTTP requests
import { LoginComponent } from './login/login.component';  // Impor LoginComponent
import { DashboardComponent } from './dashboard/dashboard.component';  // Impor DashboardComponent
import { AuthGuard } from './auth.guard';  // Impor AuthGuard

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  // Deklarasikan komponen Login
    DashboardComponent  // Deklarasikan komponen Dashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Menambahkan AppRoutingModule untuk routing
    HttpClientModule  //

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';  // Impor AuthGuard untuk rute yang memerlukan autentikasi

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Rute untuk login
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Rute untuk dashboard yang dilindungi AuthGuard
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Rute default yang mengarah ke login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Konfigurasi rute aplikasi
  exports: [RouterModule]
})
export class AppRoutingModule { }

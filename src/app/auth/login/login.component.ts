import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const payload = { username: this.username, password: this.password };

    // Melakukan request POST ke API untuk login
    this.http.post('https://dev.patriotmed.id/dashboard-user/LoginDashboard', payload).subscribe({
      next: (res: any) => {
        // Menyimpan token ke localStorage
        localStorage.setItem('token', res.token);
        // Setelah login berhasil, arahkan ke dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Login failed');  // Jika login gagal, tampilkan alert
      },
    });
  }
}

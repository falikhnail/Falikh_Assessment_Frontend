import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');  // Mengambil token dari localStorage

    if (token) {
      return this.verifyToken(token);  // Memverifikasi token menggunakan API
    } else {
      this.router.navigate(['/login']);  // Jika token tidak ada, arahkan ke login
      return new Observable<boolean>((observer) => observer.next(false));
    }
  }

  // Fungsi untuk memverifikasi token melalui API
  verifyToken(token: string): Observable<boolean> {
    return this.http.get<{ valid: boolean }>('https://dev.patriotmed.id/dashboard-user/VerifyToken', {
      headers: { Authorization: `Bearer ${token}` },  // Mengirim token dengan header Authorization
    }).pipe(
      map(response => {
        if (response.valid) {
          return true;  // Jika token valid, izinkan akses
        } else {
          this.router.navigate(['/login']);  // Jika token tidak valid, arahkan ke login
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);  // Jika ada kesalahan dalam request, arahkan ke login
        return new Observable<boolean>((observer) => observer.next(false));
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'travlr-token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
        }),
        map(() => true)
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

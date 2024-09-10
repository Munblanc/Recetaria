import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = new Map<string, string>(); // Simula una base de datos de usuarios
  private isAuthenticatedStatus = false;

  constructor() {}

  register(email: string, password: string): boolean {
    if (this.users.has(email)) {
      return false; // Usuario ya registrado
    }
    this.users.set(email, password);
    return true;
  }

  login(email: string, password: string): boolean {
    if (this.users.get(email) === password) {
      this.isAuthenticatedStatus = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedStatus = false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedStatus;
  }
}
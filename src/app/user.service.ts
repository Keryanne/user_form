// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  city: string;
  postalCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return of(this.users); // Simule une récupération de la liste
  }

  addUser(user: User): Observable<void> {
    this.users.push(user);
    return of(); // Simule une sauvegarde
  }
}

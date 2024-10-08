// src/app/registration/registration.component.ts
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: UntypedFormGroup;
  users: User[] = [];

  constructor(private fb: UntypedFormBuilder, private userService: UserService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.userService.addUser(this.registrationForm.value).subscribe(() => {
        this.loadUsers();
        alert('Inscription réussie !'); // Remplacez par un toaster en production
        this.registrationForm.reset();
      });
    }
  }

  get f() {
    return this.registrationForm.controls;
  }
}

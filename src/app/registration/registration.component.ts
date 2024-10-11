import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../user.service';
import { calculateAge } from '../utils/age-calculator'; 
import { nameValidator } from '../utils/custom-name-validators'; 
import { customEmailValidator } from '../utils/custom-email-validator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: UntypedFormGroup;
  users: User[] = [];
  ageError: string | null = null;  // Pour afficher les erreurs liées à l'âge

  constructor(private fb: UntypedFormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator()]],
      lastName: ['', [Validators.required, nameValidator()]],
      email: ['', [Validators.required, customEmailValidator]],
      birthDate: ['', Validators.required],
      city: ['', [Validators.required, nameValidator()]],
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
      // Récupération de la date de naissance
      const birthDate = this.registrationForm.get('birthDate')?.value;
      
      // Calcul de l'âge
      const age = calculateAge(birthDate);

      // Vérification si l'âge est inférieur à 18 ans
      if (age < 18) {
        this.ageError = 'Vous devez avoir au moins 18 ans pour vous inscrire.';
        return;  // Bloque l'inscription
      }

      // Réinitialisation du message d'erreur si l'âge est valide
      this.ageError = null;

      // Envoi des données au service utilisateur
      this.userService.addUser(this.registrationForm.value).subscribe(() => {
        this.loadUsers();
        this.toastr.success('Inscription réussie !', 'Succès');
        this.registrationForm.reset();
      });
    }
  }

  // Fonction de raccourci pour accéder aux contrôles du formulaire
  get f() {
    return this.registrationForm.controls;
  }
}

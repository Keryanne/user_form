import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,  ToastrModule.forRoot()],
      declarations: [ RegistrationComponent ],
      providers: [
        ToastrService
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test postal code validation
  it('should validate the postal code', () => {
    const postalCodeControl = component.registrationForm.get('postalCode');

    // Test valid postal code
    postalCodeControl?.setValue('75001'); // Valid postal code
    expect(postalCodeControl?.valid).toBeTruthy();

    // Test invalid postal code - too short
    postalCodeControl?.setValue('750'); // Too short
    expect(postalCodeControl?.valid).toBeFalsy();

    // Test invalid postal code - too long
    postalCodeControl?.setValue('750012'); // Too long
    expect(postalCodeControl?.valid).toBeFalsy();

    // Test invalid postal code - non-numeric
    postalCodeControl?.setValue('75ABC'); // Non-numeric
    expect(postalCodeControl?.valid).toBeFalsy();

    // Test valid postal code again
    postalCodeControl?.setValue('12345'); // Valid postal code
    expect(postalCodeControl?.valid).toBeTruthy();
  });

  // Test name, first name, and city validation
  it('should validate the format of name, first name, and city', () => {
    const nameControl = component.registrationForm.get('lastName');
    const firstNameControl = component.registrationForm.get('firstName');
    const cityControl = component.registrationForm.get('city');

    // Test valid name with accent
    nameControl?.setValue('Éléonore');
    expect(nameControl?.valid).toBeTruthy();

    // Test valid name with space
    nameControl?.setValue('Jean-Luc');
    expect(nameControl?.valid).toBeTruthy();

    // Test invalid name with numbers
    nameControl?.setValue('Jean123');
    expect(nameControl?.valid).toBeFalsy();

    // Test invalid name with special characters
    nameControl?.setValue('Jean@Luc');
    expect(nameControl?.valid).toBeFalsy();

    // Repeat for first name
    firstNameControl?.setValue('Émilie');
    expect(firstNameControl?.valid).toBeTruthy();
    firstNameControl?.setValue('Marie-Claire');
    expect(firstNameControl?.valid).toBeTruthy();
    firstNameControl?.setValue('Émilie123');
    expect(firstNameControl?.valid).toBeFalsy();
    firstNameControl?.setValue('Émilie@');
    expect(firstNameControl?.valid).toBeFalsy();

    // Repeat for city
    cityControl?.setValue('Paris');
    expect(cityControl?.valid).toBeTruthy();
    cityControl?.setValue('Lyon-Est');
    expect(cityControl?.valid).toBeTruthy();
    cityControl?.setValue('Paris123');
    expect(cityControl?.valid).toBeFalsy();
    cityControl?.setValue('Paris@');
    expect(cityControl?.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const emailControl = component.registrationForm.get('email');
  
    // Test valid email
    emailControl?.setValue('example@mail.com');
    fixture.detectChanges(); // Ajoutez ceci après chaque changement de valeur
    expect(emailControl?.valid).toBeTruthy();
  
    // Test email without domain
    emailControl?.setValue('example@');
    fixture.detectChanges(); // Ajoutez ceci après chaque changement de valeur
    expect(emailControl?.valid).toBeFalsy();
  
    // Test email without "@" symbol
    emailControl?.setValue('example.mail.com');
    fixture.detectChanges(); // Ajoutez ceci après chaque changement de valeur
    expect(emailControl?.valid).toBeFalsy();
  
    // Test email without dot in domain
    emailControl?.setValue('example@mail');
    fixture.detectChanges(); // Ajoutez ceci après chaque changement de valeur
    expect(emailControl?.valid).toBeFalsy();
  
    // Test invalid email (missing everything)
    emailControl?.setValue('');
    fixture.detectChanges(); // Ajoutez ceci après chaque changement de valeur
    expect(emailControl?.valid).toBeFalsy();
  
    // Test invalid email (random text)
    emailControl?.setValue('not an email');
    fixture.detectChanges(); // Ajoutez ceci après chaque changement de valeur
    expect(emailControl?.valid).toBeFalsy();
  });

  it('should disable the submit button if required fields are missing', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    // Au début, le formulaire est vide, donc le bouton doit être désactivé
    expect(submitButton.disabled).toBeTruthy();

    // Remplir tous les champs sauf le champ "email"
    component.registrationForm.setValue({
        firstName: 'John',
        lastName: 'Doe',
        email: '', // Manque l'email
        birthDate: '2000-01-01',
        city: 'Paris',
        postalCode: '75001'
    });
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy(); // Bouton doit rester désactivé

    // Remplir tous les champs
    component.registrationForm.setValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        birthDate: '2000-01-01',
        city: 'Paris',
        postalCode: '75001'
    });
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy(); // Bouton doit être activé
  });

  it('should display error messages in red for invalid fields', () => {
    const firstNameInput = fixture.nativeElement.querySelector('#firstName');

    // Marquer le champ comme "touché" et "sale" pour déclencher l'affichage des erreurs
    component.registrationForm.controls['firstName'].markAsTouched();
    component.registrationForm.controls['firstName'].markAsDirty();
    fixture.detectChanges();

    // Rechercher le message d'erreur dans le DOM
    const firstNameError = fixture.nativeElement.querySelector('.error');

    // Vérifier que le message d'erreur est affiché
    expect(firstNameError).not.toBeNull();
    expect(firstNameError.textContent).toContain('Le prénom est requis');

    // Remplir le champ pour qu'il soit valide
    component.registrationForm.controls['firstName'].setValue('John');
    fixture.detectChanges();

    // Vérifier que le message d'erreur n'est plus affiché
    const updatedFirstNameError = fixture.nativeElement.querySelector('.error');
    expect(updatedFirstNameError).toBeNull();
  });



  it('should not display error messages for valid fields', () => {
      component.registrationForm.setValue({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          birthDate: '2000-01-01',
          city: 'Paris',
          postalCode: '75001'
      });
      fixture.detectChanges();

      // Vérifier qu'aucun message d'erreur n'est affiché
      const errorMessages = fixture.nativeElement.querySelectorAll('.error');
      expect(errorMessages.length).toBe(0);
  });

});

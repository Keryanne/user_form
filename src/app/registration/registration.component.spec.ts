import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Ajoutez cette ligne
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Ajoutez HttpClientModule ici
      declarations: [ RegistrationComponent ]
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
    expect(emailControl?.valid).toBeTruthy();

    // Test email without domain
    emailControl?.setValue('example@');
    expect(emailControl?.valid).toBeFalsy();

    // Test email without "@" symbol
    emailControl?.setValue('example.mail.com');
    expect(emailControl?.valid).toBeFalsy();

    // Test email without dot in domain
    emailControl?.setValue('example@mail');
    expect(emailControl?.valid).toBeFalsy();

    // Test invalid email (missing everything)
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();

    // Test invalid email (random text)
    emailControl?.setValue('not an email');
    expect(emailControl?.valid).toBeFalsy();
  });
});

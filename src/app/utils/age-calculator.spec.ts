import { calculateAge } from './age-calculator';

describe('calculateAge', () => {

  it('should return the correct age based on the birthdate', () => {
    const birthDate = '1990-10-11';
    const age = calculateAge(birthDate);
    expect(age).toBe(34);  // Assuming today's date is 2024-10-11
  });

  it('should return 0 for a birthdate of today', () => {
    const birthDate = new Date().toISOString().split('T')[0];
    const age = calculateAge(birthDate);
    expect(age).toBe(0);
  });

  it('should return the correct age when the birthdate is later in the year', () => {
    const birthDate = '2000-12-15';
    const age = calculateAge(birthDate);
    expect(age).toBe(23);  // Assuming today's date is 2024-10-11
  });

});

// testData/registrationData.ts
import { RegistrationDetails } from '../pages/RegisterPage';

export function createRegistrationDetails(): RegistrationDetails {
  return {
    firstName: 'Test',
    lastName: 'User',
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
    phone: '555-123-4567',
    ssn: '123-45-6789',
    username: `qauser${Date.now()}`,
    password: 'Secret123',
    confirmPassword: 'Secret123'
  };
}
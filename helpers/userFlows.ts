import { Page } from '@playwright/test';
import { RegisterPage, RegistrationDetails } from '../pages/RegisterPage';
import { LoginPage, LoginCredentials } from '../pages/LoginPage';
import { createRegistrationDetails } from '../testData/registrationData';

export async function registerNewUser(page: Page): Promise<RegistrationDetails> {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  const registrationDetails = createRegistrationDetails();
  await registerPage.register(registrationDetails);

  return registrationDetails;
}

export async function loginUser(page: Page, credentials: LoginCredentials): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(credentials);
}
import { Page } from '@playwright/test';
import { RegisterPage, RegistrationDetails } from '../pages/RegisterPage';
import { LoginPage, LoginCredentials } from '../pages/LoginPage';
import { createRegistrationDetails } from '../testData/registrationData';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';
import {expect} from '@playwright/test'


export async function registerNewUser(page: Page): Promise<RegistrationDetails> {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  const registrationDetails = createRegistrationDetails();
  await registerPage.register(registrationDetails);

  await expect(page).toHaveTitle(RegisterPage.successTitle);

  return registrationDetails;
}

export async function loginUser(page: Page, credentials: LoginCredentials): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(credentials);
}

export async function openAccount(page: Page): Promise<{initialAccountId:string; newAccountId: string; allAccountIds: string[] }> {
  await registerNewUser(page);

  const accountOverviewPage = new AccountOverviewPage(page);
  await accountOverviewPage.goto();
  const initialAccountId = await accountOverviewPage.getFirstAccountId();

  const openNewAccountPage = new OpenNewAccountPage(page);
  await openNewAccountPage.goto();
  const newAccountId = await openNewAccountPage.openAccount('SAVINGS', initialAccountId);

  await accountOverviewPage.goto();
  const allAccountIds = await accountOverviewPage.getAllAccountIds();

  return { initialAccountId, newAccountId, allAccountIds };

}
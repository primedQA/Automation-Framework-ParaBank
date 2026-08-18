import { test, expect } from '@playwright/test';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';
import { registerNewUser } from '../helpers/userFlows';


test('register new user', async ({ page }) => {
    const registrationDetails = await registerNewUser(page);
    console.log(registrationDetails.username)
    console.log(registrationDetails.password)


    const accountOverviewPage = new AccountOverviewPage(page);
    await accountOverviewPage.logout();
});
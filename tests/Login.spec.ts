import { test, expect } from '@playwright/test';
import { registerNewUser, loginUser } from '../helpers/userFlows';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';

test('logs in successfully after registering', async ({ page }) => {
    const registrationDetails = await registerNewUser(page);

    const accountOverviewPage = new AccountOverviewPage(page);
    await accountOverviewPage.logout();

    await loginUser(page, {
        username: registrationDetails.username,
        password: registrationDetails.password,
    });

    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
});


test('rejects invalid login credentials', async ({ page }) => {
    await loginUser(page, { username: `nonexistent_user_${Date.now()}`, password: 'invalid_password' });
    await expect(page).not.toHaveURL(/overview/);
});
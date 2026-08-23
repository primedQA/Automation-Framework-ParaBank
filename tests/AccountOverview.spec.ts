import { test, expect } from '@playwright/test';
import { registerAndOpenAccount } from '../helpers/userFlows';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';

test('lists all account ids after opening a second account', async ({ page }) => {
    const { initialAccountId, newAccountId, allAccountIds } = await registerAndOpenAccount(page, 'SAVINGS');


    expect(allAccountIds).toContain(initialAccountId);
    expect(allAccountIds).toContain(newAccountId);
    expect(allAccountIds.length).toBe(2);
});

test('clicking an account link navigates to its activity page', async ({ page }) => {
    const { newAccountId } = await registerAndOpenAccount(page, 'SAVINGS');

    const accountOverviewPage = new AccountOverviewPage(page);
    await accountOverviewPage.goto();
    await accountOverviewPage.clickAccountLink(newAccountId);

    await expect(page).toHaveURL(new RegExp(`activity\\.htm\\?id=${newAccountId}`));
});
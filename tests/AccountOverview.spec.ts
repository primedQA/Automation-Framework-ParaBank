import { test, expect } from '@playwright/test';
import { registerAndOpenAccount } from '../helpers/userFlows';
import { ActivityPage } from '../pages/ActivityPage';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';

const accountTypes = ['SAVINGS', 'CHECKING'];

for (const accountType of accountTypes) {
    test(`opens a ${accountType} account and verifies it is correctly labeled`, async ({ page }) => {
        const { newAccountId } = await registerAndOpenAccount(page, accountType);
        console.log('newAccountId:', newAccountId);

        const activityPage = new ActivityPage(page);
        
        const accountOverviewPage = new AccountOverviewPage(page);
        await accountOverviewPage.clickAccountLink(newAccountId);

        const type = await activityPage.getAccountType()
        console.log(`type: ${type} accountType: ${accountType}`)
        expect(type).toBe(accountType);


    });
}
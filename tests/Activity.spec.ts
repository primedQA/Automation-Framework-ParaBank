import { registerAndOpenAccount } from '../helpers/userFlows';
import { ActivityPage } from '../pages/ActivityPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { test, expect } from '@playwright/test';

const accountTypes = ['SAVINGS', 'CHECKING'];

for (const accountType of accountTypes) {
    test(`verify account type and transactions for ${accountType} account`, async ({ page }) => {

        const { initialAccountId, newAccountId } = await registerAndOpenAccount(page, accountType);

        const amount = '1000.00';

        const transferFundsPage = new TransferFundsPage(page);
        await transferFundsPage.goto();
        await transferFundsPage.transferFunds(initialAccountId, newAccountId, amount);

        const activityPage = new ActivityPage(page);
        await activityPage.goto(newAccountId);

        const newAccountTxtCount = await activityPage.getTransactionCount();
        expect(newAccountTxtCount).toBe(2);

        const { credits, debits } = await activityPage.getDebitAndCreditAmounts();  
        expect(credits).toContain(`$${amount}`);

        await activityPage.goto(initialAccountId);

        const {debits: initialAccountDebits} = await activityPage.getDebitAndCreditAmounts()

        expect(initialAccountDebits).toContain(`$${amount}`);

        const initialAccountTxtCount = await activityPage.getTransactionCount();
        expect(initialAccountTxtCount).toBe(2);



    });
}
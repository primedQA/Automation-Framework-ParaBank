import { test, expect } from '@playwright/test';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { registerAndOpenAccount } from '../helpers/userFlows';


test('transfer funds between accounts', async ({ page }) => {
    const { initialAccountId, newAccountId } = await registerAndOpenAccount(page);

    const transferFundsPage = new TransferFundsPage(page);

    await transferFundsPage.goto();
    
    await transferFundsPage.transferFunds(initialAccountId, newAccountId, '1000.00')

    const results = await transferFundsPage.getTransferResults();

    expect(results.fromAccountId).toBe(initialAccountId);
    expect(results.toAccountId).toBe(newAccountId);
    expect(results.amount).toBe(1000.00);
})
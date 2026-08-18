import { test, expect } from '@playwright/test';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { openAccount } from '../helpers/userFlows';


test('transfer funds between accounts', async ({ page }) => {
    const { initialAccountId, newAccountId } = await openAccount(page);

    const transferFundsPage = new TransferFundsPage(page);

    await transferFundsPage.goto();
    
    await transferFundsPage.transferFunds('1000.00', initialAccountId, newAccountId)

    const results = await transferFundsPage.getTransferResults();

    expect(results.fromAccountId).toBe(initialAccountId);
    expect(results.toAccountId).toBe(newAccountId);
    expect(results.amount).toBe(1000.00);
})
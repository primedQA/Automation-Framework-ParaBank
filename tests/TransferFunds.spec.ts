import { test, expect } from '@playwright/test';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { openAccount } from '../helpers/userFlows';


test('transfer funds between accounts', async ({ page }) => {
    const { initialAccountId, newAccountId } = await openAccount(page);

    const transferFundsPage = new TransferFundsPage(page);

    await 





})
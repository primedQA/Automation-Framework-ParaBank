import { test, expect } from '@playwright/test';
import { openAccount } from '../helpers/userFlows';


test('opens a new savings account funded from existing account', async ({ page }) => {

    const { newAccountId, allAccountIds } = await openAccount(page);
    expect(allAccountIds).toContain(newAccountId);

});




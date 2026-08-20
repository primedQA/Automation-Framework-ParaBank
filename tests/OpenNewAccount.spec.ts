import { test, expect } from '@playwright/test';
import { registerAndOpenAccount } from '../helpers/userFlows';


test('opens a new savings account funded from existing account', async ({ page }) => {

    const { newAccountId, allAccountIds } = await registerAndOpenAccount(page);
    expect(allAccountIds).toContain(newAccountId);

});




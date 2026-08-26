import { test, expect } from '@playwright/test';
import {  registerNewUser, goToOverviewAndGetFirstAccountId } from '../../helpers/userFlows';
import { accountApiUrl, createAccountUrl } from '../../helpers/apiEndpoints'

const accountTypes = [
    { label: 'Checkings', value: 0 },
    { label: 'Savings', value: 1 },
];

for (const {label, value} of accountTypes) {
    test(`Open new ${label} account `, async ({ page }) => {
        await registerNewUser(page);
        const initialAccountId = await goToOverviewAndGetFirstAccountId(page)

        const accountResponse = await page.request.get(accountApiUrl(initialAccountId));
        const { customerId } = await accountResponse.json();

        const response = await page.request.post(createAccountUrl, {
            params: {
                customerId,
                newAccountType: value,
                fromAccountId: initialAccountId,
            },
        });
    });
};


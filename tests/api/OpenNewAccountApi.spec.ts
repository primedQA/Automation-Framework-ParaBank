import { test, expect } from '@playwright/test';
import { registerAndOpenAccount, registerNewUser, goToOverviewAndGetFirstAccountId } from '../../helpers/userFlows';


const accountTypes = [
    { label: 'Checkings', value: 0 },
    { label: 'Savings', value: 1 },
];

for (const {label, value} of accountTypes) {
    test(`Open new ${label} account `, async ({ page }) => {
        await registerNewUser(page);
        const initialAccountId = await goToOverviewAndGetFirstAccountId(page)

        const accountResponse = await page.request.get(`/parabank/services_proxy/bank/accounts/${initialAccountId}`);
        const { customerId } = await accountResponse.json();

        const response = await page.request.post('/parabank/services_proxy/bank/createAccount', {
            params: {
                customerId,
                newAccountType: value,
                fromAccountId: initialAccountId,
            },
        });
    });
};


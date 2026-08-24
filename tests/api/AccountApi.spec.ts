import { test, expect } from '@playwright/test';
import { registerAndOpenAccount } from '../../helpers/userFlows';
import { TransferFundsPage } from '../../pages/TransferFundsPage';

const accountTypes = ['SAVINGS', 'CHECKING'];

for (const accountType of accountTypes) {
  test(`GET account by id returns matching account details for ${accountType}`, async ({ page }) => {
    const { newAccountId } = await registerAndOpenAccount(page, accountType);

    const response = await page.request.get(`/parabank/services_proxy/bank/accounts/${newAccountId}`);

    expect(response.ok()).toBeTruthy();

    const account = await response.json();

    expect(account.id).toBe(Number(newAccountId));
    expect(account.type).toBe(accountType);
    expect(typeof account.balance).toBe('number');
  });
}

test('Balance reflects a transfer between accounts', async ({ page }) => {

  const { initialAccountId, newAccountId } = await registerAndOpenAccount(page);

  const beforeResponse = await page.request.get(`/parabank/services_proxy/bank/accounts/${newAccountId}`);
  const { balance: balanceBefore } = await beforeResponse.json();

  const amount = '250.00';
  const transferFundsPage = new TransferFundsPage(page);

  await transferFundsPage.goto();
  await transferFundsPage.transferFunds(initialAccountId, newAccountId, amount);

  const afterResponse = await page.request.get(`/parabank/services_proxy/bank/accounts/${newAccountId}`);
  const { balance: balanceAfter } = await afterResponse.json();

  expect(balanceAfter).toBeCloseTo(balanceBefore + Number(amount), 2);

})
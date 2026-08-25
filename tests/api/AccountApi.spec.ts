import { test, expect } from '@playwright/test';
import { registerAndOpenAccount, registerNewUser } from '../../helpers/userFlows';
import { TransferFundsPage } from '../../pages/TransferFundsPage';

const accountTypes = ['SAVINGS', 'CHECKING'];

const accountApiUrl = (accountId: string | number) => `/parabank/services_proxy/bank/accounts/${accountId}`;


for (const accountType of accountTypes) {
  test(`GET account by id returns matching account details for ${accountType}`, async ({ page }) => {
    const { newAccountId } = await registerAndOpenAccount(page, accountType);

    const response = await page.request.get(accountApiUrl(newAccountId));

    expect(response.ok()).toBeTruthy();

    const account = await response.json();

    expect(account.id).toBe(Number(newAccountId));
    expect(account.type).toBe(accountType);
    expect(typeof account.balance).toBe('number');
  });
}

test('Balance reflects a transfer between accounts', async ({ page }) => {

  const { initialAccountId, newAccountId } = await registerAndOpenAccount(page);

  const beforeResponse = await page.request.get(accountApiUrl(newAccountId));
  const { balance: balanceBefore } = await beforeResponse.json();

  const amount = '250.00';
  const transferFundsPage = new TransferFundsPage(page);

  await transferFundsPage.goto();
  await transferFundsPage.transferFunds(initialAccountId, newAccountId, amount);

  const afterResponse = await page.request.get(accountApiUrl(newAccountId));
  const { balance: balanceAfter } = await afterResponse.json();

  expect(balanceAfter).toBeCloseTo(balanceBefore + Number(amount), 2);

});

test('Non-existent account id returns an error message (should be a 400 error but known issue that it returns a 500)', async ({ page }) => {

  await registerNewUser(page);

  const response = await page.request.get(accountApiUrl(99999999));
  expect(response.status()).toBe(500);



})

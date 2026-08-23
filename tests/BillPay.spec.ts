import { test, expect } from '@playwright/test';
import { registerNewUser, goToOverviewAndGetFirstAccountId } from '../helpers/userFlows';
import { BillPayPage } from '../pages/BillPayPage';
import { createBillPayDetails } from '../testData/billPayData';

test('Verify account number and pay bill', async ({ page }) => {
    await registerNewUser(page);

    const accountId = await goToOverviewAndGetFirstAccountId(page);

    const billPayPage = new BillPayPage(page);

    await billPayPage.goto();

    const expectedAccountId = await billPayPage.getFromAccountValue();

    expect(expectedAccountId).toBe(accountId);

    const billPayDetails = createBillPayDetails();
    await billPayPage.payBill(billPayDetails);

    const resultText = await billPayPage.getBillPayConfirmationText();

    const expectedText = `Bill Payment Complete Bill Payment to ${billPayDetails.payeeName} in the amount of $${billPayDetails.amount}.00 from account ${expectedAccountId} was successful. See Account Activity for more details.`;

    expect(resultText).toBe(expectedText);

})
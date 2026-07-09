import { test, expect } from '@playwright/test';
import { registerNewUser } from '../helpers/userFlows';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';

test('opens a new savings account funded from existing account', async ({ page }) => {

    //go to register new user page, call it from the user flows page
    await registerNewUser(page);

    //open new instance of account overview page 
    const accountOverviewPage = new AccountOverviewPage(page);

    //go to the url 
    await accountOverviewPage.goto();

    // get the first account id from the account overview page
    const initialAccountId = await accountOverviewPage.getFirstAccountId();

    // open instance of new account page
    const openNewAccountPage = new OpenNewAccountPage(page);

    //go to the url of that new account page
    await openNewAccountPage.goto();

    // open a new account 
    const newAccountId = await openNewAccountPage.openAccount('SAVINGS', initialAccountId);

    await accountOverviewPage.goto();

    const allAccountIds = await accountOverviewPage.getAllAccountIds();

    expect(allAccountIds).toContain(newAccountId);

    console.log(`new account: ${newAccountId} `)
    console.log(`new account: ${allAccountIds} `)

});




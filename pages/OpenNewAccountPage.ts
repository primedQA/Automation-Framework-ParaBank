import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {

    private readonly url = '/parabank/openaccount.htm';
    private accountTypeSelect: Locator;
    private fromAccountSelect: Locator;
    private openAccountButton: Locator;
    private newAccountIdText: Locator;
    private newAccountId: Locator;

    constructor(page: Page) {
        super(page);
        this.accountTypeSelect = page.locator('#type');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.openAccountButton = page.locator('input[value="Open New Account"]');
        this.newAccountIdText = page.locator('#newAccountId');
        this.newAccountId = page.locator('#newAccountId')

    }

    async goto(): Promise<void> {
        await this.navigate(this.url)
    }

    async openAccount(accountType: string, fromAccountId: string): Promise<string> {
        await this.accountTypeSelect.selectOption({ label: accountType });
        await this.fromAccountSelect.selectOption(fromAccountId);
        await this.openAccountButton.click();
        await this.newAccountIdText.waitFor();
        return (await this.newAccountIdText.textContent()) ?? '';
        //return {initialAccountId, this.newAccountId, allAccountIds};
        
    }
}
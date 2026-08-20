import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ActivityPage extends BasePage{
    private selectMonth: Locator;
    private transactionType: Locator;
    private submit: Locator;
    private accountType: Locator;

    constructor(page: Page){
        super(page);
        this.selectMonth = page.locator('#month');
        this.transactionType = page.locator('#transactionType');
        this.submit = page.locator('input[type="submit"].button')
        this.accountType = page.locator('#accountType')
    }


    async goto(accountId: string): Promise<void> {
    await this.navigate(`/parabank/activity.htm?id=${accountId}`);
}

async getAccountType(): Promise<string> {
    await expect(this.accountType).not.toHaveText('');
    return (await this.accountType.textContent()) ?? '';
}

}
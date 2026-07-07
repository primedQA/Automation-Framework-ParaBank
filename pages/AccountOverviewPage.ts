import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountOverviewPage extends BasePage {

    private logoutLink: Locator;


    constructor(page: Page) {
        super(page);
        this.logoutLink = page.locator('a[href="logout.htm"]');

    }


    async logout(): Promise<void> {
        await this.logoutLink.click();
    }
}


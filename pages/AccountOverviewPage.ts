import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountOverviewPage extends BasePage {

    private logoutLink: Locator;
    private readonly url = '/parabank/overview.htm';
    private firstAccountLink: Locator;
    private accountLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.logoutLink = page.locator('a[href="logout.htm"]');
        this.firstAccountLink = page.locator('#accountTable a[href^="activity.htm?id="]').first();
        this.accountLinks = page.locator('#accountTable a[href^="activity.htm?id="]');
    }

    async goto(): Promise<void> {
        await this.navigate(this.url);
    }

    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    async getFirstAccountId(): Promise<string> {
        return (await this.firstAccountLink.textContent()) ?? '';
    }

    async getAllAccountIds(): Promise<string[]> {
        
        await this.accountLinks.first().waitFor();
        const count = await this.accountLinks.count();
        const accountIds: string[] = [];

        for (let i = 0; i < count; i++){
            const text = await this.accountLinks.nth(i).textContent();
            accountIds.push(text ?? '')
        }
        
        return accountIds;
    }
}



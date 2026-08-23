import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ActivityPage extends BasePage {
    private selectMonth: Locator;
    private transactionType: Locator;
    private submit: Locator;
    private accountType: Locator;
    private transactionRows: Locator;
    private debitCells: Locator;
    private creditCells: Locator;


    constructor(page: Page) {
        super(page);
        this.selectMonth = page.locator('#month');
        this.transactionType = page.locator('#transactionType');
        this.submit = page.locator('input[type="submit"].button')
        this.accountType = page.locator('#accountType')
        this.debitCells = page.locator('#transactionTable tbody tr td:nth-child(3)');
        this.creditCells = page.locator('#transactionTable tbody tr td:nth-child(4)');
        this.transactionRows = page.locator('#transactionTable tbody tr');
    }

    async goto(accountId: string): Promise<void> {
        await this.navigate(`/parabank/activity.htm?id=${accountId}`);
    }

    async getTransactionCount(): Promise<number> {
        await expect(this.transactionRows).not.toHaveCount(0);
        return await this.transactionRows.count();
    }

    async getAccountType(): Promise<string> {

        await expect(this.accountType).not.toHaveText('');
        return (await this.accountType.textContent()) ?? '';
    }

    async getDebitAndCreditAmounts(): Promise<{ debits: string[]; credits: string[] }> {
        await expect(this.transactionRows).not.toHaveCount(0);

        const rowCount = await this.transactionRows.count();

        const debits: string[] = [];
        const credits: string[] = [];

        for (let i = 0; i < rowCount; i++) {
            debits.push((await this.debitCells.nth(i).textContent()) ?? '');
            credits.push((await this.creditCells.nth(i).textContent()) ?? '');
        }

        return { debits, credits };
    }

}
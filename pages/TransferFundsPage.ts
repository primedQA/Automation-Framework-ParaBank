import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class TransferFundsPage extends BasePage {

    private readonly url = '/parabank/transfer.htm';
    private amount: Locator;
    private fromAccount: Locator;
    private toAccount: Locator;
    private transferButton: Locator;
    private transferCompleteMessage: Locator;
    private amountResult: Locator;
    private fromAccountResult: Locator;
    private toAccountResult: Locator;

    constructor(page: Page) {
        super(page);
        this.amount = page.locator('input[id="amount"]')
        this.fromAccount = page.locator('#fromAccountId');
        this.toAccount = page.locator('#toAccountId')
        this.transferButton = page.locator('input[value="Transfer"]')
        this.transferCompleteMessage = page.locator('#showResult').getByRole('heading', { name: 'Transfer Complete!' });
        this.amountResult = page.locator('#amountResult')
        this.fromAccountResult = page.locator('#fromAccountIdResult')
        this.toAccountResult = page.locator('#toAccountIdResult')

    }

    async goto(): Promise<void> {
        await this.navigate(this.url)
    }

    async transferFunds(fromAccountId: string, toAccountId: string, amount: string = '100.00'): Promise<void> {
        await this.amount.fill(amount);
        await this.fromAccount.selectOption(fromAccountId);
        await this.toAccount.selectOption(toAccountId);
        await this.transferButton.click();
        await this.transferCompleteMessage.waitFor();
    }

    async getTransferResults(): Promise<{ amount: number, fromAccountId: string, toAccountId: string }> {


        return {
            amount: parseFloat((await this.amountResult.textContent())?.replace('$', '') ?? '0'),
            fromAccountId: (await this.fromAccountResult.textContent()) ?? '',
            toAccountId: (await this.toAccountResult.textContent()) ?? '',

        };

    }
}

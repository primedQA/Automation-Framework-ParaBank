import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface BillPayDetails {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    accountNumber: string;
    verifyAccountNumber: string;
    amount: string;
}



export class BillPayPage extends BasePage {

    private payeeNameInput: Locator;
    private addressInput: Locator;
    private cityInput: Locator;
    private stateInput: Locator;
    private zipCodeInput: Locator;
    private phoneNumberInput: Locator;
    private accountNumberInput: Locator;
    private verifyAccountNumberInput: Locator;
    private amountInput: Locator;
    private fromAccountNumberInput: Locator;
    private sendPaymentButton: Locator;
    private billPayConfirmationrecipient: Locator;
    private billPayConfirmationamount: Locator;
    private billPayConfirmationfromAccount: Locator;
    private billPayResultPanel: Locator;

    private readonly url = 'https://parabank.parasoft.com/parabank/billpay.htm';



    constructor(page: Page) {
        super(page);
        this.payeeNameInput = page.locator('input[name="payee.name"]');
        this.addressInput = page.locator('input[name="payee.address.street"]');
        this.cityInput = page.locator('input[name="payee.address.city"]');
        this.stateInput = page.locator('input[name="payee.address.state"]');
        this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
        this.phoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
        this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccountNumberInput = page.locator('input[name="verifyAccount"]');
        this.amountInput = page.locator('input[name="amount"]');
        this.fromAccountNumberInput = page.locator('select[name="fromAccountId"]');
        this.sendPaymentButton = page.locator('input[value="Send Payment"]')
        this.billPayConfirmationrecipient = page.locator('#payeeName')
        this.billPayConfirmationamount = page.locator('#amount')
        this.billPayConfirmationfromAccount = page.locator('#fromAccountId')
        this.billPayResultPanel = page.locator('#billpayResult')
    }


    async goto(): Promise<void> {
        await this.navigate(this.url);
    }
    async getFromAccountValue(): Promise<string> {
        return await this.fromAccountNumberInput.inputValue();
    }
    async payBill(details: BillPayDetails) {
        await this.payeeNameInput.fill(details.payeeName);
        await this.addressInput.fill(details.address);
        await this.cityInput.fill(details.city);
        await this.stateInput.fill(details.state);
        await this.zipCodeInput.fill(details.zip);
        await this.phoneNumberInput.fill(details.phone);
        await this.accountNumberInput.fill(details.accountNumber);
        await this.verifyAccountNumberInput.fill(details.verifyAccountNumber);
        await this.amountInput.fill(details.amount);
        await this.sendPaymentButton.click();

    }

    async getBillPayConfirmationTest(): Promise<string> {

        const text = await this.billPayResultPanel.textContent();
        return (text ?? '').replace(/\s+/g, ' ').trim();
    }


}
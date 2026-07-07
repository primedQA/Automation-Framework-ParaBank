import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface RegistrationDetails {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export class RegisterPage extends BasePage {

    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private addressInput: Locator;
    private cityInput: Locator;
    private stateInput: Locator;
    private zipInput: Locator;
    private phoneInput: Locator;
    private ssnInput: Locator;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private confirmPasswordInput: Locator;
    private registerButton: Locator;
    private readonly url = '/parabank/register.htm';

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('input[name="customer.firstName"]');
        this.lastNameInput = page.locator('input[name="customer.lastName"]');
        this.addressInput = page.locator('input[name="customer.address.street"]');
        this.cityInput = page.locator('input[name="customer.address.city"]');
        this.stateInput = page.locator('input[name="customer.address.state"]');
        this.zipInput = page.locator('input[name="customer.address.zipCode"]');
        this.phoneInput = page.locator('input[name="customer.phoneNumber"]');
        this.ssnInput = page.locator('input[name="customer.ssn"]');
        this.usernameInput = page.locator('input[name="customer.username"]');
        this.passwordInput = page.locator('input[name="customer.password"]');
        this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]');
        this.registerButton = page.locator('input[value="Register"]');
    }

    async goto(): Promise<void> {
        await this.navigate(this.url);
    }
    
    async register(details: RegistrationDetails): Promise<void> {
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.addressInput.fill(details.address);
        await this.cityInput.fill(details.city);
        await this.stateInput.fill(details.state);
        await this.zipInput.fill(details.zip);
        await this.phoneInput.fill(details.phone);
        await this.ssnInput.fill(details.ssn);
        await this.usernameInput.fill(details.username);
        await this.passwordInput.fill(details.password);
        await this.confirmPasswordInput.fill(details.confirmPassword);
        await this.registerButton.click();
    }
}





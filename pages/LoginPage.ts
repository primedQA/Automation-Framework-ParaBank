import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface LoginCredentials {
    username: string;
    password: string;
}

export class LoginPage extends BasePage {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private forgotPasswordLink: Locator;
    private registerLink: Locator;
    private readonly url = '/parabank/index.htm';


    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');
        this.forgotPasswordLink = page.locator('a[href="lookup.htm"]');
        this.registerLink = page.locator('a[href="register.htm"]');
    }


    async goto(): Promise<void> {
        await this.navigate(this.url);
    }

    async login(credentials: LoginCredentials): Promise<void> {

        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
        
    }
}



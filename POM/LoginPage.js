const {By, until} = require('selenium-webdriver');

class LogIn {
    constructor(driver) {
        this.driver = driver;
        this.emailInput = By.css('[data-testid="login-email"]');
        this.passwordInput = By.css('[data-testid="login-password"]');
        this.loginButton = By.css('[data-testid="login-submit"]');
        this.dashboardMessage = By.css('[data-testid="app-title"]');
        this.errorMessage = By.css('[data-testid="login-error"]');
    }

    async enterEmail(email) {
        const emailField = await this.driver.wait(until.elementLocated(this.emailInput), 100000); 
        await emailField.sendKeys(email);
    }

    async enterPassword(password) {
        const passwordField = await this.driver.wait(until.elementLocated(this.passwordInput), 100000);
        await passwordField.sendKeys(password);
    }

    async clickLogInButton() {
        const logInButton = await this.driver.wait(until.elementLocated(this.loginButton), 100000);
        await logInButton.click();
    }

    async logIn(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogInButton();
    }

    async getDashboardMessage() {
        const dashboardElement = await this.driver.wait(until.elementLocated(this.dashboardMessage), 100000);
        return await dashboardElement.getText();
    }

    async getErrorMessage() {
        const errorElement = await this.driver.wait(until.elementLocated(this.errorMessage), 100000);
        return await errorElement.getText();
    }

    async isErrorDisplayed() {
        try {
            await this.driver.wait(until.elementLocated(this.errorMessage), 100000);
            return true;
        } catch (error) {
            return false;
        }
    }

}

module.exports = LogIn;
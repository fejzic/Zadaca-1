const { By, until } = require('selenium-webdriver');

class SettingPage {     
    constructor(driver) {
        this.driver = driver;
        this.typeReportButton = By.css('[data-testid="report-type"]');
        this.notifyEmailInput = By.css('[data-testid="notify-email"]');
        this.sendReportCheckbox = By.css('[data-testid="send-report-checkbox"]');
        this.saveSettingsButton = By.css('[data-testid="save-settings"]');
        this.toastMessage = By.id('toast');

    }

    async selectReportType(reportType) {
        const reportTypeButton = await this.driver.wait(until.elementLocated(this.typeReportButton), 50000);
        await reportTypeButton.click();
        const option = await reportTypeButton.findElement(By.xpath(`.//option[text()='${reportType}']`));
        await option.click();
    }   

    async setNotifyEmail(email) {
        const emailInput = await this.driver.wait(until.elementLocated(this.notifyEmailInput), 50000);
        await emailInput.clear();
        await emailInput.sendKeys(email);
    }   

    async selectReportCheckbox() {
        const checkbox = await this.driver.wait(until.elementLocated(this.sendReportCheckbox), 50000);
        const isChecked = await checkbox.isSelected();
        if (!isChecked ) {
            await checkbox.click();
        }
    }

    async isReportCheckboxSelected() {
        const checkbox = await this.driver.wait(until.elementLocated(this.sendReportCheckbox), 50000);
        return await checkbox.isSelected();
    }   

    async saveSettings() {
        const saveButton = await this.driver.wait(until.elementLocated(this.saveSettingsButton), 50000);
        await saveButton.click();
    }   

    async getToastMessage() {
        const toastElement = await this.driver.wait(until.elementLocated(this.toastMessage), 50000);
        return await toastElement.getText();
    }   


}

module.exports = SettingPage;
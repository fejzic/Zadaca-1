const buildDriver = require("../utils/BasePage");
const testData = require("../config/testData");

const LoginPage = require("../POM/LoginPage");

const SettingPage = require("../POM/SettingPage");

describe("Setting Test", () => {
    let driver;
    let loginPage;

    beforeEach(async () => {

        driver = await buildDriver();

        loginPage = new LoginPage(driver);
        await loginPage.logIn(testData.validUser.email, testData.validUser.password);

        settingPage = new SettingPage(driver);

    });

    afterEach(async () => {

        await driver.quit();

    });

    test.only("Zadatak 12: Promjena postavki izvještaja", async () => {
        await settingPage.selectReportType(testData.reportTypes.monthly);
        await settingPage.setNotifyEmail(testData.emailForNotification.validEmail);
        await settingPage.selectReportCheckbox();
        await settingPage.saveSettings();           
        expect(await settingPage.isReportCheckboxSelected()).toBe(true);

        await settingPage.getToastMessage().then((message) => {
            expect(message).toBe("Postavke su uspješno sačuvane.");
        });     
    });

});         
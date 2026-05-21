const buildDriver = require("../utils/BasePage");
const testData = require("../config/testData");

const LoginPage = require("../POM/LoginPage");
const environment = require("../config/environment");

describe("LogIn Test", () => {
    let driver;
    let loginPage;

    beforeEach(async () => {

        driver = await buildDriver();

        loginPage = new LoginPage(driver);

    });



    afterEach(async () => {

        await driver.quit();

    });

    test("Zadatak 1: Uspjesno logiranje sa validim kredencijalima", async () => {
        await loginPage.logIn(testData.validUser.email, testData.validUser.password);

        const dashboardMessage = await loginPage.getDashboardMessage();
        expect(dashboardMessage).toBe("Proximus CRM Dashboard");  

        
    });     

    test("Zadatak 2: Neuspjesno logiranje sa nevalidim kredencijalima", async () => {
        await loginPage.logIn(testData.invalidUser.email, testData.invalidUser.password);

        const errorMessage = await loginPage.getErrorMessage();

        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBe(true);
        expect(errorMessage).toBe("Neispravni podaci za prijavu.");  
    }     
    );      

    
});

const buildDriver = require("../utils/driver");
const testData = require("../config/testData");

const LoginPage = require("../POM/LoginPage");
const environment = require("../config/environment");

describe("LogIn Test", () => {
    let driver;
    let loginPage;

    beforeAll(async () => {

        driver = await buildDriver();

        loginPage = new LoginPage(driver);

    });


    beforeEach(async () => {

        await driver.get(environment.baseUrl);

    });

    afterAll(async () => {

        await driver.quit();

    });

    test("Uspjesno logiranje sa validim kredencijalima", async () => {
        await loginPage.logIn(testData.validUser.email, testData.validUser.password);

        const dashboardMessage = await loginPage.getDashboardMessage();
        expect(dashboardMessage).toBe("Proximus CRM Dashboard");  

        
    });     

    test("Neuspjesno logiranje sa nevalidim kredencijalima", async () => {
        await loginPage.logIn(testData.invalidUser.email, testData.invalidUser.password);

        const errorMessage = await loginPage.getErrorMessage();

        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBe(true);
        expect(errorMessage).toBe("Neispravni podaci za prijavu.");  
    }     
    );      

    
});

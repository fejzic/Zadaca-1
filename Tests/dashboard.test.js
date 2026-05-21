const buildDriver = require("../utils/BasePage");
const testData = require("../config/testData");

const LoginPage = require("../POM/LoginPage");


const DashboardPage = require("../POM/DashboardPage");

describe("Dashboard Test", () => {
    let driver;
    let loginPage;

    beforeEach(async () => {

        driver = await buildDriver();

        loginPage = new LoginPage(driver);
        await loginPage.logIn(testData.validUser.email, testData.validUser.password);

        dashboardPage = new DashboardPage(driver);

    });

    afterEach(async () => {

        await driver.quit();

    });

    test("Provjera dashboard kartica", async () => {

        
        const totalClients = await dashboardPage.getTotalClients();
        const activeClients = await dashboardPage.getActiveClientsDashboardCount();
        const revenue = await dashboardPage.getRevenue();

        expect(totalClients).toBe(await dashboardPage.countTotalClinetsFromListOfClients());
        expect(activeClients).toBe(await dashboardPage.countActiveClientsFromListOfClients());
        expect(revenue).toBe(await dashboardPage.calculateRevenueFromListOfClients());

        console.log('Broj ukupnog prihoda:', await dashboardPage.calculateRevenueFromListOfClients());

        console.log('Broj ukupnih klijenata:', await dashboardPage.countTotalClinetsFromListOfClients());

        console.log('Broj aktivnih klijenata:', await dashboardPage.countActiveClientsFromListOfClients());
    });


});
       
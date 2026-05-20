const buildDriver = require("../utils/driver");
const testData = require("../config/testData");

const LoginPage = require("../POM/LoginPage");
const environment = require("../config/environment");

const DashboardPage = require("../POM/DashboardPage");

describe("Dashboard Test", () => {
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

    test("Provjera dashboard kartica", async () => {
        await loginPage.logIn(testData.validUser.email, testData.validUser.password);

        const dashboardPage = new DashboardPage(driver);
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
       
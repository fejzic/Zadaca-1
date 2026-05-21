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
        const vipClients = await dashboardPage.getVipClients();
        const revenue = await dashboardPage.getRevenue();

        expect(totalClients).toBe(await dashboardPage.countTotalClinetsFromListOfClients());

        expect(activeClients).toBe(await dashboardPage.countActiveClientsFromListOfClients());

        expect(vipClients).toBe(await dashboardPage.countVipClientsFromListOfClients());

        expect(revenue).toBe(await dashboardPage.calculateRevenueFromListOfClients());

        console.log('Broj ukupnog prihoda:', await dashboardPage.calculateRevenueFromListOfClients());
        console.log('Broj ukupnih klijenata:', await dashboardPage.countTotalClinetsFromListOfClients());
        console.log('Broj aktivnih klijenata:', await dashboardPage.countActiveClientsFromListOfClients());
        console.log('Broj VIP klijenata:', await dashboardPage.countVipClientsFromListOfClients());
    });

    test("Provjera da li tabela ima 6 redova", async () => {
        const rows = await dashboardPage.driver.findElements(dashboardPage.tableRows);
        expect(rows.length).toEqual(await dashboardPage.countTotalClinetsFromListOfClients());        
        });

    test("Pronaci klijenta po data atributu", async () => {
        const client =
        await dashboardPage.getClientData(
            "Hotel Pino"
        );



    expect(client.client)
        .toBe(testData.clientData.client);

    console.log(client.client);

    expect(client.city).toBe(testData.clientData.city);

    console.log(client.city);

    expect(client.status).toBe(testData.clientData.status);

    console.log(client.status);

    expect(client.type).toBe(testData.clientData.type);

    console.log(client.type);

    expect(client.revenue).toBe(testData.clientData.revenue);

    console.log(client.revenue);
    });

    


});
       
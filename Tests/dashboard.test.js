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

    test.only("Zadatak 3: Provjera dashboard kartica", async () => {

        
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

    test.only("Zadatak 4: Provjera da li tabela ima 6 redova", async () => {
        const rows = await dashboardPage.driver.findElements(dashboardPage.tableRows);
        expect(rows.length).toEqual(await dashboardPage.countTotalClinetsFromListOfClients());        
        });

    test.only("Zadatak 5: Pronaci klijenta po data atributu", async () => {
        const client =
        await dashboardPage.getClientData(testData.clientData.client);

    expect(client.client).toBe(testData.clientData.client);

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

    test.only("Zadatak 6: Pronaci klijenta po data atributu i kliknuti na dugme 'Detalji'", async () => {
        await dashboardPage.getClientDataByAttribute(testData.clientData2.client);

    });

    test.only("Zadatak 7: Provjeriti da li se modalni prozor sa detaljima klijenta prikazuje i zatvoriti ga", async () => {
        await dashboardPage.getClientDataByAttribute(testData.clientData2.client);

        const modalData = await dashboardPage.getModalClientData();

       expect(modalData.client).toContain(testData.clientData2.client);

       console.log('Ime klijenta:', modalData.client);

       expect(modalData.city).toContain(testData.clientData2.city);

       console.log('Grad klijenta:', modalData.city);
       
       expect(modalData.revenue).toContain(testData.clientData2.revenue);

       console.log('Prihod klijenta:', modalData.revenue);

       
        const isModalDisplayed = await dashboardPage.isModalDisplayed();
        expect(isModalDisplayed).toBe(true);

        await dashboardPage.closeModal();

        const isModalClosed = await dashboardPage.isModalClosed();
        expect(isModalClosed).toBe(true);           
    
    });

});
       
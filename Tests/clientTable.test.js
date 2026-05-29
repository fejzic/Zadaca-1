const buildDriver = require("../utils/BasePage");
const testData = require("../config/testData");

const LoginPage = require("../POM/LoginPage");

const ClientsTablePage = require("../POM/ClientsTablePage");

describe("Clients Table Test", () => {
    let driver;
    let loginPage;

    beforeEach(async () => {

        driver = await buildDriver();

        loginPage = new LoginPage(driver);
        await loginPage.logIn(testData.validUser.email, testData.validUser.password);

        clientsTablePage = new ClientsTablePage(driver);

    });

    afterEach(async () => {

        await driver.quit();

    });

    test.only("Zadatak 8: Filtriranje klijenata po statusu", async () => {
        await clientsTablePage.filterByStatus(testData.statusFilter.active);
        expect(await clientsTablePage.areVisibleOnlyClientsWithStatus(testData.statusTable.active)).toBe(true);

        await clientsTablePage.filterByStatus(testData.statusFilter.inactive);
        expect(await clientsTablePage.areVisibleOnlyClientsWithStatus(testData.statusTable.inactive)).toBe(true);

        });

        test.only("Zadatak 9: Pretraga klijenata po imenu", async () => { 
            await clientsTablePage.searchClientByName(testData.clinetsNames.client2);
            expect(await clientsTablePage.hasVisableResults()).toBe(true);
            expect(await clientsTablePage.countVisibleClientsMatchingSearch(testData.clinetsNames.client2)).toBe(1);

            await clientsTablePage.searchClientByName(testData.clinetsNames.client1);
            expect(await clientsTablePage.hasVisableResults()).toBe(true);
            expect(await clientsTablePage.countVisibleClientsMatchingSearch(testData.clinetsNames.client1)).toBe(1);
        });

        test.only("Zadatak 10: Sortiranje klijenata po prihodu", async () => {
            await clientsTablePage.sortByRevenue(testData.sortFiltersOptions.revenueDesc);

            expect(await clientsTablePage.isSortedByRevenueDescending()).toBe(true);
        });

        test.only("Zadatak 11: Brisanje klijenta", async () => {
            const initialCount = await clientsTablePage.countTotalClinetsFromListOfClients();

            console.log('Broj klijenata prije brisanja:', initialCount);

            await clientsTablePage.deleteClientByName(testData.deleteClient.client);    
        
            const finalCount = await clientsTablePage.countTotalClinetsFromListOfClients();
            console.log('Broj klijenata nakon brisanja:', finalCount);

            expect(finalCount).toBe(initialCount - 1);

            console.log('Broj klijenata nakon brisanja (finalna provjera):', await clientsTablePage.countTotalClinetsFromListOfClients());

            expect(await clientsTablePage.isClientDeleted(testData.deleteClient.client)).toBe(true);

            expect(await clientsTablePage.getToastMessage()).toBe("Klijent je obrisan.");
            
        });
    }
);
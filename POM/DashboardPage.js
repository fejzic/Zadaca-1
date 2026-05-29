const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.budgeActiveElements = By.css('.badge.active');
        this.tableRows = By.css("#clients-table tbody tr");
        this.totalClients = By.css('[data-testid="clients-count"]');
        this.activeClients = By.css('[data-testid="active-count"]');
        this.inactiveClients = By.css('[data-testid="inactive-clients"]');
        this.revenue = By.css('[data-testid="revenue-total"]');
        this.tableRowsCells = By.xpath("//tbody/tr/td[contains(text(),'KM')]");
        this.VIPClients = By.css('[data-testid="vip-count"]');
        this.VIPClientsElements = By.css('.badge.vip');
        this.buttonDetails = By.xpath(".//button[contains(text(),'Detalji')]");
        this.modalContent = By.id('client-modal');
        this.modalClientName = By.id('modal-client-name');
        this.modalClientCity = By.id('modal-client-city');
        this.modalClientRevenue = By.id('modal-client-revenue');
        this.modalCloseButton = By.id('close-modal');
    }


    async getActiveClientsDashboardCount() {

        const activeClientsElement = await this.driver.wait(until.elementLocated(this.activeClients), 50000);
        const activeClientsText = await activeClientsElement.getText();

        return parseInt(activeClientsText);
    }

    async countActiveClientsFromListOfClients() {
        const activeClientsElements = await this.driver.wait(until.elementsLocated(this.budgeActiveElements), 50000);
        return activeClientsElements.length;
    }


    async getTotalClients() {
        const totalClientsElement = await this.driver.wait(until.elementLocated(this.totalClients), 50000);;
        const totalClientsText = await totalClientsElement.getText();

        return parseInt(totalClientsText);
    }

    async countTotalClinetsFromListOfClients() {
        const rows = await this.driver.wait(until.elementsLocated(this.tableRows), 50000);
        return rows.length;
    }

    async getVipClients() {
        const vipClientsElement = await this.driver.wait(until.elementLocated(this.VIPClients), 50000);
        const vipClientsText = await vipClientsElement.getText();

        return parseInt(vipClientsText);
    }

    async countVipClientsFromListOfClients() {
        const vipClientsElements = await this.driver.wait(until.elementsLocated(this.VIPClientsElements), 50000);
        return vipClientsElements.length;
    }


    async getRevenue() {
        const revenueElement = await this.driver.wait(until.elementLocated(this.revenue), 50000);
        const revenueText = await revenueElement.getText();

        return parseFloat(revenueText.replace(/[^0-9.-]+/g, ""));
    }

    async calculateRevenueFromListOfClients() {

        const revenueCells = await this.driver.wait(until.elementsLocated(this.tableRowsCells), 50000);

        let totalRevenue = 0;



        for (const cell of revenueCells) {

            const revenueText =
                await cell.getText();

            totalRevenue += Number(
                revenueText.replace("KM", "").trim()
            );

        }

        return totalRevenue;
    }

    async getClientRows(clientName) {
        const clientRows = await this.driver.wait(until.elementsLocated(By.xpath(`//tbody/tr[td[contains(text(),'${clientName}')]]`)), 50000);
        return clientRows;
    }

    async getRowCells(row) {

        return await row.findElements(By.tagName("td"));

    }
    async getCellText(cell) {

        return await cell.getText();

    }

    async getClientData(clientName) {

        const rows = await this.getClientRows(clientName);

        const keys = [
            "client",
            "city",
            "status",
            "type",
            "revenue"
        ];


        for (const row of rows) {
            const cells = await this.getRowCells(row);
            const rowData = {};
            for (let i = 0; i < cells.length; i++) {
                const cellText = await this.getCellText(cells[i]);
                rowData[keys[i]] = cellText
            }


            return rowData;
        }

    }

    async getClientDataByAttribute(clientName) {

        const rows = await this.getClientRows(clientName);

        for (const clientRow of rows) {

            const detailsButton = clientRow.findElement(this.buttonDetails);

            await detailsButton.click();

            //await this.driver.sleep(5000);

        }
    }

    async isModalDisplayed() {

        try {
            const modal = await this.driver.wait(until.elementLocated(this.modalContent), 50000);
            return await modal.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async getModalClientData() {

        const modalElements = [

            await this.driver.wait(until.elementLocated(this.modalClientName), 50000),

            await this.driver.wait(until.elementLocated(this.modalClientCity), 50000),

            await this.driver.wait(until.elementLocated(this.modalClientRevenue), 50000)

        ];

        const keys = [
            "client",
            "city",
            "revenue"
        ];

        const modalData = {};

        for (let i = 0; i < modalElements.length; i++) {
            const text = await this.getCellText(modalElements[i]);

            modalData[keys[i]] = text;

        }

        return modalData;

    }

    async closeModal() {

        const closeButton = await this.driver.wait(until.elementLocated(this.modalCloseButton), 50000);
        await closeButton.click();

    }

    async isModalClosed() {

        const modal =
            await this.driver.findElement(
                this.modalContent
            );



        return !(await modal.isDisplayed());

    }

} module.exports = DashboardPage;
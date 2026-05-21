const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.budgeActiveElements = By.className('badge active');
        this.tableRows = By.css("#clients-table tbody tr");
        this.totalClients = By.css('[data-testid="clients-count"]');
        this.activeClients = By.css('[data-testid="active-count"]');
        this.inactiveClients = By.css('[data-testid="inactive-clients"]');
        this.revenue = By.css('[data-testid="revenue-total"]');
        this.tableRowsCells = By.xpath("//tbody/tr/td[contains(text(),'KM')]");
        this.VIPClients = By.css('[data-testid="vip-count"]');
        this.VIPClientsElements = By.css('.badge.vip');
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
        const totalClientsElement = await this.driver.wait(until.elementLocated(this.totalClients), 50000);      ;
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



} module.exports = DashboardPage;
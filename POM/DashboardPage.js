const {By, until} = require('selenium-webdriver');

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

        const activeClientsElement = await this.driver.findElement(this.activeClients);
        const activeClientsText = await activeClientsElement.getText(); 

        return parseInt(activeClientsText);
    }

    async countActiveClientsFromListOfClients() {
        const activeClientsElements = await this.driver.findElements(this.budgeActiveElements);
        return activeClientsElements.length;
    }


    async getTotalClients() {
        const totalClientsElement = await this.driver.findElement(this.totalClients);
        const totalClientsText = await totalClientsElement.getText();

        return parseInt(totalClientsText);
    }

    async countTotalClinetsFromListOfClients() {
        const rows = await this.driver.findElements(this.tableRows);
        return rows.length;
    }

    async getVipClients() {
        const vipClientsElement = await this.driver.findElement(this.VIPClients);
        const vipClientsText = await vipClientsElement.getText();

        return parseInt(vipClientsText);
    }

    async countVipClientsFromListOfClients() {
        const vipClientsElements = await this.driver.findElements(this.VIPClientsElements);
        return vipClientsElements.length;
    }


    async getRevenue() {
        const revenueElement = await this.driver.findElement(this.revenue);
        const revenueText = await revenueElement.getText();

        return parseFloat(revenueText.replace(/[^0-9.-]+/g, ""));
    }

    async calculateRevenueFromListOfClients() {

    const revenueCells = await this.driver.findElements(this.tableRowsCells);

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

    

}module.exports = DashboardPage;
const { By, until } = require('selenium-webdriver');
const DashboardPage = require('./DashboardPage');

class ClientsTablePage extends DashboardPage{
    constructor(driver) {
        super(driver);
        this.statusFilter = By.id("status-filter");
        this.searchInput = By.css('[data-testid="client-search"]');
        this.sortFilter = By.css('[data-testid="sort-filter"]');
        this.deleteButtons = By.xpath(".//button[contains(text(),'Obriši')]");
        this.toastMessage = By.id('toast');
    }

    async filterByStatus(status) {
        const filterElement = await this.driver.wait(until.elementLocated(this.statusFilter), 50000);
        await filterElement.click();
        const option = await filterElement.findElement(By.xpath(`.//option[text()='${status}']`));
        await option.click();
    }

    async areVisibleOnlyClientsWithStatus(status) {
        const rows = await this.driver.findElements(this.tableRows);
        for (let row of rows) {
            if(await row.isDisplayed()) {
                const cells = await this.getRowCells(row);
                const statusCell = cells[2];
                const statusText = await this.getCellText(statusCell);  
                if (statusText !== status) {
                    return false;
                }
            }       
        }

        return true;
    }

    async searchClientByName(clientName) {
        const searchElement = await this.driver.wait(until.elementLocated(this.searchInput), 50000);
        await searchElement.clear();
        await searchElement.sendKeys(clientName);
    }

    async hasVisableResults() {     
        const rows = await this.driver.findElements(this.tableRows);
        for (let row of rows) {
            if(await row.isDisplayed()) {
                return true;
            }       
        }

        return false;
    }

    async countVisibleClientsMatchingSearch(searchText) {
        let count = 0;
        const rows = await this.driver.findElements(this.tableRows);    
        for (let row of rows) {     
            if(await row.isDisplayed()) {
                const cells = await this.getRowCells(row);
                const clientCell = cells[0];
                const clientText = await this.getCellText(clientCell);
                if (clientText.toLowerCase().includes(searchText.toLowerCase())) {
                    count++;
                }
            }
        }
        return count;
    }   

    async sortByRevenue(optionText) {
        const sortElement = await this.driver.wait(until.elementLocated(this.sortFilter), 50000);
        await sortElement.click();
        const option = await sortElement.findElement(By.xpath(`.//option[text()='${optionText}']`));
        await option.click();
    }

    async getRevenueValues() {
        const revenueValues = [];
        const rows = await this.driver.findElements(this.tableRows);    
        for (let row of rows) {     
            if(await row.isDisplayed()) {
                const cells = await this.getRowCells(row);
                const revenueCell = cells[4];
                const revenueText = await this.getCellText(revenueCell);
                const revenueValue = parseFloat(revenueText.replace(/[^0-9.-]+/g,""));
                revenueValues.push(revenueValue);
            }
        }
        return revenueValues;
    }

    async isSortedByRevenueDescending(order) {
        const revenueValues = await this.getRevenueValues();
        for (let i = 0; i < revenueValues.length - 1; i++) {
            if(revenueValues[i] < revenueValues[i + 1]) {
                return false;
            }
        }   
        return true;
    }   

    async deleteClientByName(clientName) {
        const rows = await this.getClientRows(clientName);
        for (let row of rows) {
            const cells = await this.getRowCells(row);
            const clientCell = cells[0];
            const clientText = await this.getCellText(clientCell);
            if (clientText === clientName) {
                const deleteButton = await row.findElement(this.deleteButtons);
                await deleteButton.click();
                break;
            }
        }
    }

    async isClientDeleted(clientName) {
        const rows = await this.driver.findElements(this.tableRows);     
        for (let row of rows) { 
            const cells = await this.getRowCells(row);
            const clientCell = cells[0];
            const clientText = await this.getCellText(clientCell);
            if (clientText === clientName) {
                return false;
            }
        }
        return true;
    }

    async getToastMessage() {
        const toastElement = await this.driver.wait(until.elementLocated(this.toastMessage), 50000);
        return await toastElement.getText();
    }   



}

module.exports = ClientsTablePage;
const { Builder } = require("selenium-webdriver");
const environment = require("../config/environment");

async function buildDriver() {

    const driver = await new Builder().forBrowser("chrome").build();

    await driver.get(environment.baseUrl);

    await driver.manage().window().maximize();

    return driver;
}

module.exports = buildDriver;
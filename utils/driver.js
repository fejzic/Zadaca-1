const { Builder } = require("selenium-webdriver");

async function buildDriver() {

    const driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().window().maximize();

    return driver;
}

module.exports = buildDriver;
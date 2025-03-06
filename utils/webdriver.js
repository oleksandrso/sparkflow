const { Builder, By, until } = require('selenium-webdriver');
const config = require('../config/config');

class WebDriverUtils {
    constructor() {
        this.driver = null;
    }

    async initialize() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.manage().setTimeouts({ implicit: config.timeouts.implicit, pageLoad: config.timeouts.pageLoad });
        return this.driver;
    }

    async quit() {
        if (this.driver) await this.driver.quit();
    }

    getDriver() {
        return this.driver;
    }

    async getElement(selector) {
        return await this.driver.wait(until.elementLocated(By.css(selector)), config.timeouts.implicit);
    }

    async getElements(selector) {
        return await this.driver.findElements(By.css(selector));
    }

    async waitForVisible(selector) {
        const element = await this.getElement(selector);
        await this.driver.wait(until.elementIsVisible(element), config.timeouts.implicit);
        return element;
    }

    async log(message) {
        console.log(`[INFO] ${message}`);
    }
}

module.exports = new WebDriverUtils();
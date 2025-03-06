const { Builder, By, until, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const os = require('os');
const path = require('path');
const config = require('../config/config');

class WebDriverUtils {
    constructor() {
        this.driver = null;
    }

    async initialize() {
        // Create Chrome options
        const options = new chrome.Options();

        // Create unique temp directory for each run
        const tempDir = path.join(os.tmpdir(), `chrome-${Date.now()}`);
        options.addArguments(`--user-data-dir=${tempDir}`);

        // Build the driver with proper browser specification
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Set timeouts from config
        await this.driver.manage().setTimeouts({
            implicit: config.timeouts.implicit,
            pageLoad: config.timeouts.pageLoad
        });

        this.log('WebDriver initialized');
        return this.driver;
    }

    getDriver() {
        if (!this.driver) {
            throw new Error('WebDriver not initialized. Call initialize() first.');
        }
        return this.driver;
    }

    async quit() {
        if (this.driver) {
            this.log('Quitting WebDriver');
            await this.driver.quit();
        }
    }

    async waitForVisible(selector, timeout = config.timeouts.implicit) {
        await this.driver.wait(until.elementLocated(By.css(selector)), timeout);
        return await this.driver.wait(until.elementIsVisible(
            this.driver.findElement(By.css(selector))), timeout);
    }

    async getElement(selector) {
        await this.waitForVisible(selector);
        return await this.driver.findElement(By.css(selector));
    }

    async getElements(selector) {
        await this.waitForVisible(selector);
        return await this.driver.findElements(By.css(selector));
    }

    log(message) {
        console.log(`[WebDriver] ${message}`);
    }
}

module.exports = new WebDriverUtils();
const { Builder, By, until, Capabilities } = require('selenium-webdriver');
const os = require('os');
const path = require('path');

class WebDriverUtils {
    constructor() {
        this.driver = null;
    }

    async initialize() {
        const chromeOptions = new Capabilities();
        // Создаем уникальную временную директорию для каждого запуска
        const tempDir = path.join(os.tmpdir(), `chrome-${Date.now()}`);
        chromeOptions.set('chromeOptions', { args: [`--user-data-dir=${tempDir}`] });
        this.driver = await new Builder()
            .forBrowser('chrome')
            .withCapabilities(chromeOptions)
            .build();
        await this.driver.manage().setTimeouts({ implicit: 10000, pageLoad: 15000 });
        return this.driver;
    }

    async quit() {
        if (this.driver) await this.driver.quit();
    }
}

module.exports = new WebDriverUtils();
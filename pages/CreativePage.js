const { By } = require('selenium-webdriver');
const config = require('../config/config');
const webdriver = require('../utils/webdriver');

class CreativePage {
    constructor() {
        this.driver = webdriver.getDriver();
    }

    async open() {
        await this.driver.get(config.baseUrl);
        await webdriver.waitForVisible(config.selectors.creativeName);
        webdriver.log('Creative page opened');
    }

    async getCreativeName() {
        const element = await webdriver.getElement(config.selectors.creativeName);
        return await element.getText();
    }

    async getCreativeId() {
        const element = await webdriver.getElement(config.selectors.creativeId);
        const text = await element.getText();
        return text.split('ID: ')[1];
    }

    async setDeviceDimensions(width, height) {
        const widthInput = await webdriver.getElement(config.selectors.widthInput);
        const heightInput = await webdriver.getElement(config.selectors.heightInput);
        await widthInput.clear();
        await widthInput.sendKeys(width);
        await heightInput.clear();
        await heightInput.sendKeys(height);
        webdriver.log(`Device dimensions set to ${width}x${height}`);
    }

    async adjustZoom() {
        await (await webdriver.getElement(config.selectors.zoomIn)).click();
        await (await webdriver.getElement(config.selectors.zoomOut)).click();
        const range = await webdriver.getElement(config.selectors.zoomRange);
        await this.driver.executeScript('arguments[0].value = 1.5; arguments[0].dispatchEvent(new Event("input"))', range);
        webdriver.log('Zoom adjusted to 1.5');
    }

    async submitGeoForm(latitude, longitude, zip) {
        await (await webdriver.getElement(config.selectors.latitudeInput)).sendKeys(latitude);
        await (await webdriver.getElement(config.selectors.longitudeInput)).sendKeys(longitude);
        await (await webdriver.getElement(config.selectors.zipInput)).sendKeys(zip);
        await (await webdriver.getElement(config.selectors.submitButton)).click();
        webdriver.log('Geo form submitted');
    }

    async toggleMonitor() {
        await (await webdriver.getElement(config.selectors.toggleMonitor)).click();
        await webdriver.waitForVisible(config.selectors.monitorPanel);
        webdriver.log('Monitor toggled on');
    }

    async restartAd() {
        await (await webdriver.getElement(config.selectors.restartAd)).click();
        webdriver.log('Ad restarted');
    }

    async clearMonitorLog() {
        await (await webdriver.getElement(config.selectors.clearLog)).click();
        webdriver.log('Monitor log cleared');
    }

    async printMonitorEvents() {
        await this.driver.sleep(2000); // Delay to ensure events load
        const rows = await webdriver.getElements(config.selectors.monitorTableRows);
        if (rows.length === 0) {
            webdriver.log('No Monitor events found');
        } else {
            for (let row of rows) {
                const cells = await row.findElements(By.tagName('td'));
                const eventData = await Promise.all(cells.map(cell => cell.getText()));
                webdriver.log(`Monitor Event: ${eventData.join(' | ')}`);
            }
        }
    }
}

module.exports = CreativePage;
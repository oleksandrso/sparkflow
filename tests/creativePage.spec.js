const assert = require('assert');
const webdriver = require('../utils/webdriver');
const CreativePage = require('../pages/CreativePage');

describe('Creative Page Tests', () => {
    let page;

    before(async () => {
        await webdriver.initialize();
        page = new CreativePage();
    });

    after(async () => {
        await webdriver.quit();
    });

    it('should open Chrome and load creative page', async () => {
        await page.open();
        const title = await page.getCreativeName();
        assert.strictEqual(title, 'Test Creative');
    });

    it('should change device dimensions', async () => {
        await page.setDeviceDimensions('500', '500');
    });

    it('should adjust zoom', async () => {
        await page.adjustZoom();
    });

    it('should submit Geo form', async () => {
        await page.submitGeoForm('40.7128', '-74.0060', '10001');
    });

    it('should toggle monitor', async () => {
        await page.toggleMonitor();
    });

    it('should restart ad', async () => {
        await page.restartAd();
    });

    it('should clear monitor log', async () => {
        await page.clearMonitorLog();
    });

    it('should print all Monitor events', async () => {
        await page.printMonitorEvents();
    });

    it('should find Creative ID', async () => {
        const creativeId = await page.getCreativeId();
        assert.strictEqual(creativeId, '125173');
    });
});
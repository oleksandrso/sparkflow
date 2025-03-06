module.exports = {
    baseUrl: 'https://admin.sparkflow.net/d/?d=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyNTE3MyIsImZvcm1hdCI6Ijg0In0.wsH8fGVOxBu3GVFb3AbY1ZHHgEdxUjV6Kx2Rc056L5o&nodevices=1&device=full-screen&zoom=1',
    timeouts: {
        implicit: 10000,
        pageLoad: 15000
    },
    selectors: {
        creativeName: '[automation-id="demoCreativeName"]',
        creativeId: '[automation-id="demoCreativeID"]',
        widthInput: '#settingsDeviceDimensions [automation-id="settingsDeviceWidth"] input',
        heightInput: '#settingsDeviceDimensions [automation-id="settingsDeviceHeight"] input',
        zoomIn: '#zoom-in',
        zoomOut: '#zoom-out',
        zoomRange: '#range',
        latitudeInput: '[automation-id="sf_ut_latitude"] input',
        longitudeInput: '[automation-id="sf_ut_longitude"] input',
        zipInput: '[automation-id="sf_ut_zip_code"] input',
        submitButton: '#submitQueryParams',
        toggleMonitor: '#toggle-monitor',
        monitorPanel: '#monitor-panel',
        restartAd: '#restart-ad',
        clearLog: '.monitor__panel--clear',
        monitorTableRows: '#monitor-panel .sf__table tbody tr'
    }
};
const { BrowserWindow } = require('electron');
const path = require("path");

module.exports = createConverterWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, './frontend/index.html')).then();

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

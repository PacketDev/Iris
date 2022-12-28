const electron = require('electron');
const { join } = require('path');

const original = process.env.ORIGINAL_PRELOAD;
const Logger = require('../utils/logging/Logger');
const updater = require('../core/updater');

module.exports = new (class ElectronBrowserWindow {
  constructor(
    options = {
      actions: {
        preload: {},
        BrowserWindow: electron.BrowserWindow,
        patcher: updater,
      },
    }
  ) {
    function createWindow() {
      const window = new electron.BrowserWindow({
        width: 960,
        height: 540,
        autoHideMenuBar: true,
        webPreferences: {
          preload: join(__dirname, 'preload', 'preload.js'),
          sandbox: false,
        },
      });

      Logger.INFO('Created BrowserWindow.');

      window.loadURL('http://localhost:3000/login');
    }

    electron.app.whenReady().then(() => {
      createWindow();

      electron.app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      });
    });
    if (
      (options.actions.preload =
        original ?? options.actions.BrowserWindow ?? options.actions.patcher)
    ) {
      process.env.PATH = electron.app.getAppPath();
    }
  }
})();

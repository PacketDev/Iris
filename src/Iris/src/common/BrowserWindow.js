const electron = require("electron");
const { join } = require("path");

const original = process.env.ORIGINAL_PRELOAD;
const Logger = require("../utils/logging/Logger");
const updater = require("../core/updater");

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
        width: 900,
        height: 720,
        icon: "./assets/icon.ico",
        webPreferences: {
          preload: join(__dirname, "../", "renderer", "preload.js"),
          sandbox: false,
        },
      });

      Logger.INFO("Created BrowserWindow.");

      window.loadURL("http://localhost");
    }

    electron.app.whenReady().then(() => {
      createWindow();

      electron.app.on("activate", () => {
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
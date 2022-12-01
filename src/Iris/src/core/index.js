const { BrowserWindow } = require("electron");
const IrisBrowserWindow = require("../common/BrowserWindow");
const Settings = require("../common/Settings");

module.exports = new class Beta {
    constructor() {
        Object.defineProperty(IrisBrowserWindow, BrowserWindow, { configurable: true });
        Object.defineProperty(Settings, null, { configurable: true });
    }
}
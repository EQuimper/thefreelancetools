const electron = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

if (isDev) {
  require('electron-debug')({ showDevTools: false });
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    minHeight: 500,
    minWidth: 1000,
    webPreferences: {
      nodeIntegration: false,
    },
    // titleBarStyle: 'hidden',
    // titleBarStyle: 'hiddenInset',
    // frame: false,
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

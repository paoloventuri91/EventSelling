const {app, BrowserWindow, globalShortcut} = require('electron')

global.event = {
   event_id: 0,
   name: ""
};


let mainWindow
function createWindow () {
   // Creazione della schermata principale
   mainWindow = new BrowserWindow({width: 800, height: 600})

   // Caricamento della pagina di login
   mainWindow.loadFile('html/login.html')

   // Rimozione del menu a tendina
   mainWindow.setMenu(null);

   // Attesa della pagina prima della visualizzazione
   mainWindow.once('ready-to-show', () => {
      mainWindow.show()
   })

   // Ingrandimento della schermata
   mainWindow.maximize();

   // Operazioni da eseguire in chiusura della schermata
   mainWindow.on('closed', function () {
      mainWindow = null
   })
}

// Creazione della schermata quando l'app è pronta
app.on('ready', createWindow)

// Aggiunta della shortcut globale per l'apertura dei dev tools
app.on('ready', () => {
   globalShortcut.register('Ctrl+Shift+I', () => {
      mainWindow.webContents.openDevTools()
   })
})

// Operazioni eseguite in chiusira dell'app
app.on('window-all-closed', function () {
   if (process.platform !== 'darwin') {
      app.quit()
   }
})

// Operazioni eseguite in fase di attivazione dell'app
app.on('activate', function () {
   if (mainWindow === null) {
      createWindow()
   }
})
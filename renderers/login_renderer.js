const { remote } = require('electron')
const BrowserWindow = remote.BrowserWindow;
const currentWindow = remote.getCurrentWindow();

// Creazione del client per la comunicazione con il backend python
const zerorpc = require('zerorpc')
let client = new zerorpc.Client()
client.connect('tcp://127.0.0.1:4243')

// Recupero dell'elenco degli eventi disponibili
client.invoke('getEvents', (error, res) => {
   if(error) {
      console.error(error)
   } else {
      res.forEach(event => showEvent(event));
   }
})

// Gestione del pulsante per l'inserimento di un nuovo evento
const newButton = document.getElementById('newButton')
newButton.addEventListener('click', function() {
   // Creazione della schermata secondaria
   newWindow = new BrowserWindow({
      parent: currentWindow,
      modal: true,
      width: 300,
      height:160,
   });

   // Caricamento della pagina di inserimento del nuovo evento
   newWindow.loadFile('html/newEvent.html')

   // Rimozione del menu a tendina
   newWindow.setMenu(null);

   // Operazioni da eseguire in chiusura della schermata
   newWindow.on('close', function(){
      newWindow = null;
      currentWindow.reload()
   });
})

// Funzione di inserimento di un evento nell'elenco della schermata
function showEvent(event){
   const container = document.getElementById('eventList');
   const button = document.createElement('button')
   button.setAttribute('class', 'eventButton')
   button.innerHTML = event['name'] + ' ❯'
   button.addEventListener('click', function() {
      remote.getGlobal('event').event_id = event.event_id
      remote.getGlobal('event').name = event.name
      currentWindow.loadFile('html/menu.html')
   })
   container.appendChild(button);
}
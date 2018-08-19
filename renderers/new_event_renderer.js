const { remote } = require('electron')
const dialog = remote.dialog

// Creazione del client per la comunicazione con il backend python
const zerorpc = require('zerorpc')
let client = new zerorpc.Client()
client.connect('tcp://127.0.0.1:4243')

// Gestione dell'evento per l'inserimento del nuovo nome di evento
document.querySelector('form').addEventListener('submit', insertNewEvent);

// Gestione dell'inserimento di un nuovo evento
function insertNewEvent(){
   const currentWindow = remote.getCurrentWindow()
   let eventName = document.getElementById('eventNameInput').value

   // Se il nome è vuoto non inserisco l'evento
   if(eventName == '') {
      dialog.showMessageBox({
         buttons: ['OK'],
         title: 'Inserimento nuovo evento',
         message: 'Imposibile inserire un evento senza nome!'
      })
   } else {
      client.invoke('insertEvent', eventName, (error, res) => {
         if(error) {
            console.error(error)
         } else {
            console.log(res)
         }
      })

      // Chiusura della schermata di inserimento del nuovo evento
      currentWindow.close()
   }
}
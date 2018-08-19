const { remote } = require('electron')
const BrowserWindow = remote.BrowserWindow;

const zerorpc = require('zerorpc')
let client = new zerorpc.Client()

client.connect('tcp://127.0.0.1:4243')

client.invoke('echo', 'server ready', (error, res) => {
   if(error || res !== 'server ready') {
      console.error(error)
   } else {
      console.log('server is ready')
   }
})

client.invoke('getEvents', (error, res) => {
   if(error) {
      console.error(error)
   } else {
      res.forEach(event => showEvent(event));
   }
})

const newButton = document.getElementById('newButton')
newButton.addEventListener('click', function() {
   const currentWindow = remote.getCurrentWindow();

   newWindow = new BrowserWindow({
      parent: currentWindow,
      modal: true,
      width: 300,
      height:200,
   });

   newWindow.loadFile('html/newEvent.html')

   newWindow.setMenu(null);

   newWindow.on('close', function(){
      newWindow = null;
      currentWindow.reload()
   });
})

function showEvent(event){
   const container = document.getElementById('eventList');
   const button = document.createElement('button')
   button.setAttribute('class', 'eventButton')
   button.innerHTML = event['name'] + ' ❯'
   container.appendChild(button);
}
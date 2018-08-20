const { remote } = require('electron')
const currentWindow = remote.getCurrentWindow();

// Creazione del client per la comunicazione con il backend python
const zerorpc = require('zerorpc')
let client = new zerorpc.Client()
client.connect('tcp://127.0.0.1:4243')

// Impostazione del titolo principale con il nome dell'evento
const eventNameH1 = document.getElementById('eventNameH1')
eventNameH1.innerHTML = remote.getGlobal('event').name

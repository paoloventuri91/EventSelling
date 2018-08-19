const { remote } = require('electron')

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

document.querySelector('form').addEventListener('submit', insertNewEvent);

function insertNewEvent(){
   let eventName = document.getElementById('eventNameInput').value
   client.invoke('insertEvent', eventName, (error, res) => {
      if(error) {
         console.error(error)
      } else {
         console.log(res)
      }
   })
   remote.getCurrentWindow().close()
}
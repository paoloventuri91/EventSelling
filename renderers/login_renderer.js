const { remote } = require('electron')

const zerorpc = require("zerorpc")
let client = new zerorpc.Client()

client.connect("tcp://127.0.0.1:4243")

client.invoke("echo", "server ready", (error, res) => {
   if(error || res !== 'server ready') {
      console.error(error)
   } else {
      console.log("server is ready")
   }
})

client.invoke("getEvents", (error, res) => {
   if(error) {
      console.error(error)
   } else {
      res.forEach(event => showEvent(event));
   }
})

function showEvent(event){
   const container = document.getElementById('eventList');
   const button = document.createElement('button')
   button.setAttribute('class', 'eventButton')
   button.innerHTML = event['name'] + ' ❯'
   container.appendChild(button);
}
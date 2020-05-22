const { remote, ipcRenderer } = require('electron');
const mainProcess = remote.require('./main.js');

const responseView = document.querySelector('#response');
const makeRequestButton = document.querySelector('#make-request');

makeRequestButton.addEventListener('click', () => {
   mainProcess.makeServerRequest();
});

ipcRenderer.on('server-respond', (event, response) => {
    responseView.value = response;
});
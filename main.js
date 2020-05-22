const { app, BrowserWindow, dialog } = require('electron');

let mainWindow = null;

const server = require('./server/app');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 230,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

const makeServerRequest = exports.makeServerRequest = () => {
    let serverResponse = '';

    const { net } = require('electron');
    const request = net.request('http://localhost:3000');
    request.on('response', (response) => {
        // console.log('RESPONSE:' + JSON.stringify(response));

        // console.log(`STATUS: ${response.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        response.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`);
            serverResponse = serverResponse + chunk;
            mainWindow.webContents.send('server-respond', serverResponse);
        });
        response.on('end', () => {
            // console.log('No more data in response.')
        })
    });
    request.end();
};
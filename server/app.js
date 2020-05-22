const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    res.send('Date: ' + datetime.toString());
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

module.exports = app;

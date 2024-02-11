const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/public/login.html');
})

app.get('/logout', (req, res)=>{
    res.sendFile(__dirname + '/public/logout.html');
})

app.get('/form', (req, res)=>{
    res.sendFile(__dirname + '/public/form.html');
})

app.listen(port);
console.log('Front-End server is now running in port '+port);
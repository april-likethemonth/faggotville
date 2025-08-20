const express = require('express');
const fs = require("fs");


const data = fs.readFileSync('messages.txt','utf8');
let messageList = data.split("\n");


const app = express();
app.use(express.json());

app.post('/message', (req, res) => {
    const message = req.body.message;
    messageList.push(message);
    res.send("yay! your message is " + message + "\n");

    let writeFile = fs.createWriteStream('messages.txt');
    messageList.forEach(function(v) { writeFile.write(v + '\n'); });
    writeFile.end();
});

app.get('/messages', (req, res) => {
    res.send(messageList)
});

app.listen(3001);
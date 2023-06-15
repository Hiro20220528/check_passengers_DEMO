const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = 3000;
const path = require('path');
const fs = require('fs').promises; // jsonファイルを読み込むために必要
const util = require('util');
const child_process = require('child_process');

const bodyParser = require('body-parser'); // post bodyを受け取る
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); // publicフォルダの中身を静的ファイル


app.get('/', (req, res) => {
          res.sendFile(__dirname + '/public/index.html');
});


server.listen(PORT, () => {
          console.log('lisning on *:3000');
});
        
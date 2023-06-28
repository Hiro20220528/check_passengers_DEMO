const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
// const io = require('socket.io')(server);
require('./server_socket_io')(server);
const PORT = 3000;
const path = require('path');
const fs = require('fs').promises; // jsonファイルを読み込むために必要
const util = require('util');
const child_process = require('child_process');
const qr_code = require('qrcode'); // urlのqrコードを生成する
const qr_dir = path.join(__dirname, 'public/qrcode/'); // qrコードを保存するディレクトリ
// qr_dirの絶対パス
// const qr_dir_path = path.join(__dirname, 'public/qrcode');
const bodyParser = require('body-parser'); // post bodyを受け取る
// const { rejects } = require('assert'); // jsonファイルを読み込むために必要
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); // publicフォルダの中身を静的ファイル

const home_ip_address = '192.168.0.151';
const lab_ip_address = '192.168.100.21';

// ここのipアドレスを変更する
// const ip_address = home_ip_address; 
const ip_address = lab_ip_address;

// input.jsonのパス
input_json_path = "./zkproof/count_js/input.json";
max_passengers = "6"; // 最大乗車人数
var user_id = 2104; // ユーザーのID
user_id = Math.floor(Math.random() * 10000); // ユーザーのIDをランダムに生成

// qrcodeディレクトリを掃除する
// console.log(qr_dir);
// fs.readdir(qr_dir, (err, files) => {
//           console.log(files);
//           if (err) throw err;
//           console.log("qr_dirの中身を削除中...");
//           for (const file of files) {
//                     if (path.extname(file) === '.svg') {
//                               fs.unlink(path.join(qr_dir, file), err => {
//                                         if (err) throw err;
//                               });
//                     }
//           }
// });
// console.log("qr_dirの中身を削除完了");


// ページ一覧を表示 get
app.get('/', (req, res) => {
          res.sendFile(__dirname + '/public/index.html');
});

// 乗車人数予約画面 get
app.get('/booking', (req, res) => {
          res.sendFile(__dirname + '/public/booking.html');
});

// 乗車人数確定画面へpost
app.post('/driver-confirm', async (req, res) => {
          const count = 0; // 乗員がタップした回数を数える数を初期化
          const booking_number = req.body.passengers; // 乗車人数を取得

          console.log(booking_number);

          // input.jsonを生成する
          await write_input_json(input_json_path, booking_number, null, max_passengers);
          res.sendFile(__dirname + '/public/driver_confirmation.html');
});

app.get('/user-id', (req, res) => {
          console.log('user-id');
          user_id += 1; // ユーザーを増やして、別の:idを作成する
          // urlのqrコードを生成する
          qr_code.toFile(`${qr_dir}qr_code_${user_id}.svg`, `http://${ip_address}:${PORT}/passengers/:${user_id}`, {
                    scale: 3, // QRコードのサイズ
                    color: {
                              dark: '#000000', // 前景色
                              light: '#ffffff' // 背景色
                    }
          }, (err) => {
                    if (err) throw err;
                    console.log('QRコードを生成しました');
          });
          console.log(user_id);
          res.json({ user_id: user_id });

});

// 乗車人数確定画面 get
app.get('/driver-confirm', (req, res) => {
          res.sendFile(__dirname + '/public/driver_confirmation.html');
});

app.get('/passengers/:id', (req, res) => {
          // console.log(req.params.id);
          let passengers_id = req.params.id
          res.sendFile(__dirname + '/public/passengers_confirmation.html');
});


// サーバーを起動
server.listen(PORT,() => {
          console.log('lisning on *:3000');
});

async function write_input_json(json_path, reserved = 0, passengers = 0, max_passengers = 0) {
          try {
                    await fs.writeFile(json_path, JSON.stringify({ "reserved": `${reserved}`, "passengers": `${passengers}`, "max_passengers": `${max_passengers}` }));
                    console.log('write success');
          } catch (err) {
                    console.error(err);
          }
}

async function read_input_json(json_path) {
          try {
                    const data = await fs.readFile(json_path, 'utf-8', (err) => {
                              if (err) {
                                        console.log(err);
                                        return;
                              }
                    });
                    console.log(data);
                    return data;
          } catch (err) {
                    console.error(err);
          }
}

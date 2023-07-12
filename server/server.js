const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
// const io = require('socket.io')(server);
require('./server_socket_io')(server);
require("dotenv").config();
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
app.use(express.json());
const { availableParallelism } = require('os');
// const { rejects } = require('assert'); // jsonファイルを読み込むために必要
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); // publicフォルダの中身を静的ファイル

const home_ip_address = '192.168.0.151';
const lab_ip_address = '192.168.100.21';

// ここのipアドレスを変更する
const ip_address = home_ip_address;
// const ip_address = lab_ip_address;

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

app.get('/secretkey-transfer', (req, res) => {
          res.sendFile(__dirname + '/public/secure_transfer.html');
});

const { ethers, JsonRpcProvider }  = require('ethers');
const contractInfo = require('./contractInfo.js');

const privateKey = process.env.PRIVATE_KEY;
console.log(privateKey);

const wallet = new ethers.Wallet(privateKey);
const provider = new JsonRpcProvider(contractInfo.rpc_url);
const walletConnected = wallet.connect(provider);
console.log(wallet.address);
const creditContract = new ethers.Contract(contractInfo.contractAddress, contractInfo.contractABI, walletConnected);
console.log('ok');

async function main() {
          const tx = await creditContract.getUserAddress(1);
          console.log(tx);

          const givePermission = await creditContract.givePermission(
                    "0x1c9dED1E29D989917Cd91f5272a21E160054EF14",
                    "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
          );

          await givePermission.wait();
          console.log("Permission given");
}

// main();




// 乗車人数確定画面へpost
app.post('/driver-confirm', async (req, res) => {
          const hashed_text = req.body.hashed_text;
          const wallet_address = req.body.wallet_address;
          console.log(hashed_text);
          console.log(wallet_address);

          try {
                    const givePermission = await creditContract.givePermission(
                              wallet_address,
                              hashed_text
                    );
                    await givePermission.wait();
                    console.log("Permission given");
                    res.json({ status: "ok" });
          } catch (error) {
                    console.log(error);
                    res.json({ status: "ng" });
          }
          

          // console.log(booking_number);
          // if (booking_number == '') {
          //           res.sendFile(__dirname + '/public/booking.html');
          //           return;
          // }else {
          //           res.sendFile(__dirname + '/public/driver_confirmation.html');
          // }
          // res.sendFile(__dirname + '/public/driver_confirmation.html');
          // input.jsonを生成する
          // await write_input_json(input_json_path, booking_number, null, max_passengers);

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
          // リロードすると元の画面に戻す
          // res.sendFile(__dirname + '/public/driver_confirmation.html');
          res.sendFile(__dirname + '/public/driver_confirmation.html');
});

app.get('/passengers/:id', (req, res) => {
          // console.log(req.params.id);
          let passengers_id = req.params.id
          res.sendFile(__dirname + '/public/passengers_confirmation.html');
});

app.get('/verification.json', (req, res) => {
          // ./public/zkp_lib/verification_key.jsonを返答する
          res.sendFile(__dirname + '/public/zkp_lib/verification_key.json');
});

// サーバーを起動
server.listen(PORT, () => {
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

import { ethers, JsonRpcProvider } from "./ethers/dist/ethers.min.js";
import { contractABI, contractAddress, rpc_url } from "./contract_info.js";

const privateKey = JSON.parse(localStorage.getItem('unSaftyPrivateKey'));
// console.log(privateKey);

if (privateKey === null) {
          alert('秘密鍵がありません。');
          location.href = '../index.html';
}

const wallet = new ethers.Wallet(privateKey);
const provider = new JsonRpcProvider(rpc_url);
const walletConnected = wallet.connect(provider);
console.log(wallet.address);
const creditContract = new ethers.Contract(contractAddress, contractABI, walletConnected);
console.log('ok');




// socket.ioの設定
const socket = io(); // サーバと接続する

// console.log('socket.io connected');

let startBottom = document.getElementById('start');
let booking_passengers = document.getElementById('booking_number');
let witness = document.getElementById('witness');
let make_proof = document.getElementById('make-proof');
let booking_number;
let user_id; // ユーザーのID
let ride_count = 1; // 乗車ボタンが押された回数 (初期値は1)

// 最初は乗車中ボタンを押せないようにする
window.onload = function () {
          // user_idを取得する
          // console.log('onload');
          booking_number = JSON.parse(localStorage.getItem('booking_number'));
          // localStorage.clear(); // 一括削除してしまう
          // console.log(booking_number);

          booking_passengers.innerHTML = `あなたの予約人数は ${booking_number} 人です。`;

          witness.innerHTML = `現在の証明人数は ${ride_count} 人です。`;

          fetch('/user-id')
                    .then(responce => responce.json())
                    .then(data => {
                              // console.log(data.user_id);
                              // usr_idのroomにjoinする
                              user_id = data.user_id.toString();
                              socket.emit('join', user_id);
                              // console.log(typeof (user_id));
                              let qr_code = document.getElementById('qr_code');
                              qr_code.src = `../qrcode/qr_code_${user_id}.svg`; // ./で指定しないといけない
                              let room_id = document.getElementById('room_id');
                              room_id.innerHTML = `あなたのルーム番号は ${user_id} です。`;
                    });
}


// 非同期関数でuserIdを取得する
async function getUserId() {
          const userId = await creditContract.getUserId(wallet.address);
          // await userId.wait();
          console.log(userId, 'id');
}

// getUserId();

// startボタンが押されると、startイベントを送信する
startBottom.addEventListener('click', function () {
          console.log('start clicked');
          socket.emit('start', user_id);
          startBottom.disabled = true;
});

socket.on('ride', () => {
          console.log('ride');
          ride_count += 1;
          witness.innerHTML = `現在の証明人数は ${ride_count} 人です。`;
          // rideBottom.disabled = false;
});

make_proof.addEventListener('click', async function () {
          console.log('make proof clicked');
          console.log(booking_number, ride_count);
          console.log(typeof (booking_number), typeof (ride_count));
          // snarkjsで証明を生成する
          // 証明を生成したら、proofを送信する
          await generateProof();
});

async function generateProof() {
          console.log(booking_number, ride_count);
          const { proof, publicSignals } = await snarkjs.groth16.fullProve(
                    // {"reserved": `${booking_number}`, "passengers": `${ride_count.toString()}`, "maximum": "6"},
                    { reserved: Number(booking_number), passengers: ride_count, maximum: 6 },
                    "./zkp_lib/count.wasm", // circuit
                    "./zkp_lib/multiplier2_0001.zkey" // proving key
          );

          const vkey = await fetch("verification.json").then(function (res) {
                    return res.json();
          });

          console.log(vkey);
          console.log(publicSignals);
          console.log(proof);
          const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
          console.log("result:", res);

          let a = proof["pi_a"];
          a = ["0x" + BigInt(`${a[0]}`).toString(16), "0x" + BigInt(`${a[1]}`).toString(16)];
          // console.log(a[0]);

          let b = proof["pi_b"];
          // b = [["0x" + BigInt(`${b[0][0]}`).toString(16), "0x" + BigInt(`${b[0][1]}`).toString(16)], ["0x" + BigInt(`${b[1][0]}`).toString(16), "0x" + BigInt(`${b[1][1]}`).toString(16)]];
          let b_0x = [];
          for (let i = 0; i < b.length; i++) {
                    let bi = BigInt(`${b[i][0]}`).toString(16);
                    while (bi.length < 64) {
                              bi = "0" + bi;
                    }
                    let bii = BigInt(`${b[i][1]}`).toString(16);
                    while (bii.length < 64) {
                              bii = "0" + bii;
                    }
                    b_0x.push(["0x" + bii, "0x" + bi]);
          }

          let c = proof["pi_c"];
          c = ["0x" + BigInt(`${c[0]}`).toString(16), "0x" + BigInt(`${c[1]}`).toString(16)];
          // console.log(c);

          let publicInput = BigInt("6").toString(16);
          while (publicInput.length < 64) {
                    publicInput = "0" + publicInput;
          }
          publicInput = "0x" + publicInput;
          // console.log(publicInput);

          const tmp = ["0x0000000000000000000000000000000000000000000000000000000000000006"];

          console.log([a[0], a[1]], [b_0x[0], b_0x[0]], [c[0], c[1]], tmp, 'hello');

          // console.log(tmp);



          const tryProof = await creditContract.tryProof([a[0], a[1]], [b_0x[0], b_0x[1]], [c[0], c[1]], tmp, 'hello');
          // const tryProof = await creditContract.tryProof(
          //           ["0x20dcbe4fd28739879ba77b89c580314cfc25c772d19e1a39f1d3e26a06a52e20", "0x060db6b922680ce600e1a7843c9410686d8d23aed77d49dde5fa7a9a7d76b765"],
          //           [["0x2a52e82f60aa8f874e97eefbb73116f222a15de0c4b9bb9931770fc0ed53e41c", "0x0ed2324631d59ee42ccb471e0174a0549eea0f7464ce797c0de52359ddd119c6"], ["0x238e5f4c4a41529f54ec4d22023dae8fc7a6cc76ea9179d01779dc97126ab984", "0x2de85a3858cc85a47290c63c356cdf57cf3e07f2598d90a6992f7ac1ad29e8ad"]],
          //           ["0x1e2b196a712c64b364addecf9fd34fa7ac7d0b8d88fd2b9dbb5df28f01f77792", "0x287e60a36e6b3d2cfc24a875a52723dc7da6e2cac5296a69eda4e7bc097beed3"],
          //           ["0x0000000000000000000000000000000000000000000000000000000000000006"],
          //           'hello'
          // );
          await tryProof.wait();
          console.log(tryProof);

}
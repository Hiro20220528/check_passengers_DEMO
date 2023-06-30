// socket.ioの設定
const socket = io(); // サーバと接続する

console.log('socket.io connected');

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
          console.log('onload');
          booking_number = JSON.parse(localStorage.getItem('booking_number'));
          localStorage.clear();
          console.log(booking_number);

          booking_passengers.innerHTML = `あなたの予約人数は ${booking_number} 人です。`;

          witness.innerHTML = `現在の証明人数は ${ride_count} 人です。`;

          fetch('/user-id')
                    .then(responce => responce.json())
                    .then(data => {
                              console.log(data.user_id);
                              // usr_idのroomにjoinする
                              user_id = data.user_id.toString();
                              socket.emit('join', user_id);
                              console.log(typeof (user_id));
                              let qr_code = document.getElementById('qr_code');
                              qr_code.src = `./qrcode/qr_code_${user_id}.svg`; // ./で指定しないといけない
                              let room_id = document.getElementById('room_id');
                              room_id.innerHTML = `あなたのルーム番号は ${user_id} です。`;
                    });
}


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
          const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
          console.log("result:", res);
}

let json_bottom = document.getElementById('json_bottom');
json_bottom.addEventListener('click', async function () {
          const vkey = await fetch("verification.json").then(function (res) {
                    return res.json();
          });
          console.log(vkey);
          const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
          console.log(res);
});
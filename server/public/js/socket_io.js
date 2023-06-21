// socket.ioの設定(共通部分)
const socket = io(); // サーバと接続する
console.log('socket.io');
let startBottom = document.getElementById('start');
let rideBottom = document.getElementById('ride');

// 最初は乗車中ボタンを押せないようにする
window.onload = function() {
          rideBottom.disabled = true;
}

// startボタンが押されると、startイベントを送信する
startBottom.addEventListener('click', function() {
          console.log('start clicked');
          socket.emit('start');
          startBottom.disabled = true;
});

// startが押されると、乗車中ボタンを押せるようにする
socket.on('start', function() {
          console.log('start');
          rideBottom.disabled = false;
});

// 乗車中ボタンが押されると、rideイベントを送信する
rideBottom.addEventListener('click', function() {
          socket.emit('ride');
          // 複数回押せないようにする
          rideBottom.disabled = true;
});

// ボタンを無効化する
socket.on('disable', function() {
          rideBottom.disabled = true;
});
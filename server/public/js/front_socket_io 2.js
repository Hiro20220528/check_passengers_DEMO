// socket.ioの設定(共通部分)
const socket = io(); // サーバと接続する

console.log('socket.io');

// startが押されると、乗車中ボタンを押せるようにする
socket.on('start', function() {
          console.log('start');
          rideBottom.disabled = false;
});

// ボタンを無効化する
socket.on('disable', function() {
          rideBottom.disabled = true;
});
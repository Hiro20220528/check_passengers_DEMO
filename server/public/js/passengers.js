
let rideBottom = document.getElementById('ride');
let user_id; // ユーザーのID

// 最初は乗車中ボタンを押せないようにする
window.onload = function() {
          rideBottom.disabled = true;
          let pathSegments = location.pathname.split('/');
          user_id = pathSegments[pathSegments.length - 1].split(':')[1];
          // console.log(id);
          console.log(typeof(user_id));
          socket.emit('join', user_id);
          let qr_code = document.getElementById('qr_code');
          qr_code.src = `../qrcode/qr_code_${user_id}.svg`; // ../で指定しないといけない
          let room_id = document.getElementById('room_id');
          room_id.innerHTML = `あなたのルーム番号は ${user_id} です。`;
}


// 乗車中ボタンが押されると、rideイベントを送信する
rideBottom.addEventListener('click', function() {
          socket.emit('ride', user_id);
          // 複数回押せないようにする
          rideBottom.disabled = true;
});

// startが押されると、乗車中ボタンを押せるようにする
socket.on('start', function() {
          console.log('start');
          rideBottom.disabled = false;
});

// ボタンを無効化する
socket.on('disable', function() {
          rideBottom.disabled = true;
});
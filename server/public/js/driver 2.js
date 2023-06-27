
let startBottom = document.getElementById('start');
let rideBottom = document.getElementById('ride');

let user_id; // ユーザーのID

// 最初は乗車中ボタンを押せないようにする
window.onload = function() {
          rideBottom.disabled = true;
          // user_idを取得する
          fetch('/user-id')
          .then(responce => responce.json())
          .then(data => {
                    console.log(data.user_id);
                    // usr_idのroomにjoinする
                    user_id = data.user_id.toString();
                    socket.emit('join', user_id);
                    console.log(typeof(user_id));
                    
                    let qr_code = document.getElementById('qr_code');
                    qr_code.src = `./qrcode/qr_code_${user_id}.svg`;
                    let room_id = document.getElementById('room_id');
                    room_id.innerHTML = `あなたのルーム番号は ${user_id} です。`;
          });
}

// startボタンが押されると、startイベントを送信する
startBottom.addEventListener('click', function() {
          console.log('start clicked');
          socket.emit('start', user_id);
          startBottom.disabled = true;
});

socket.on('ride', () => {
          console.log('ride');
          rideBottom.disabled = false;
});
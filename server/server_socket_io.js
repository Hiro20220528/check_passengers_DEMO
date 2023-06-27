const socketIo = require('socket.io');

// server側のsocket.ioの設定(共通部分)
module.exports = (server) => {
          const io = socketIo(server);
          
          // userが接続した時の処理
          io.on('connection', (socket) => {
                    console.log('a user connected');

                    // driverがstartしたときの処理
                    socket.on('start', () => {
                              console.log('start');
                              io.emit('start');
                    
                              // 5秒後にボタンを有効化
                              setTimeout(async() => {
                                        io.emit('disable');
                                        // await zkproof();
                              }, 5000);
                    });
                    
                    // userがrideしたときの処理
                    socket.on('ride', () => {
                              // count++;
                              console.log(`click ${count}`);
                    });

                    // userが切断した時の処理
                    socket.on('disconnect', () => {
                              console.log('user disconnected');
                    });
          });
};
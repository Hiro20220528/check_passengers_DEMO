const socketIo = require('socket.io');

// server側のsocket.ioの設定(共通部分)
module.exports = (server) => {
          const io = socketIo(server);
          
          // userが接続した時の処理
          io.on('connection', (socket) => {
                    console.log('a user connected');

                    // userがjoinしたときの処理
                    socket.on('join', (room) => {
                              console.log(`join ${room}`);
                              socket.join(room);
                    });

                    // driverがstartしたときの処理
                    socket.on('start', (room) => {
                              console.log('start');
                              io.to(room).emit('start');
                              console.log(typeof(room));
                              console.log(room);
                              // 5秒後にボタンを有効化
                              setTimeout(async() => {
                                        io.to(room).emit('disable');
                                        // await zkproof();
                                        // 証明を生成する
                              }, 5000);
                    });
                    
                    // userがrideしたときの処理
                    socket.on('ride', (room) => {
                              // count++;
                              socket.to(room).emit('ride');
                              // console.log(`click ${count}`);
                    });

                    // userが切断した時の処理
                    socket.on('disconnect', () => {
                              console.log('user disconnected');
                    });
          });
};
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Genel dizini servis et
app.use(express.static(__dirname));

// Sohbet dinle
io.on('connection', (socket) => {
  console.log('Yeni kullanıcı bağlandı');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});

// Sunucuyu başlat
server.listen(3000, () => {
  console.log('Sohbet sunucusu http://localhost:3000 adresinde çalışıyor');
});

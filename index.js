const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const path = require('path')

var enabled = true;

app.get('/', (req, res) => {
  if (enabled) res.sendFile(path.join(__dirname, 'index.html'));
  else res.sendFile(path.join(__dirname, 'closed.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('close message', () => {
    enabled = false;
    io.emit('close message');
  })
});

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});

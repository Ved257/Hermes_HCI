const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const socketIo = require('socket.io');
const cors = require('cors');
const http = require('http');

require('dotenv').config();
require('./models/init');

const authRoute = require('./routes/auth');
const { group } = require('console');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/auth', authRoute);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('EstabConn', { one: 'one' });

  socket.on('join', (group) => {
    let rooml = [...socket.rooms];
    if (rooml[1] != undefined) socket.leave(rooml[1]);
    socket.join(group);
  });

  socket.on('msg', (msg) => {
    let rooml = [...socket.rooms];
    console.log(rooml);
    if (rooml[1] != undefined) socket.to(rooml[1]).emit('msg', msg);
    else {
      socket.emit('status', 'No group joined');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected!');
  });
});

app.get('*', (req, res) => {
  res.send('error 404');
});

PORT = process.env.PORT;
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});

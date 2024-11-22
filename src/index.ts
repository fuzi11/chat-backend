import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Chat Backend!' });
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Ketika pengguna mengirim pesan
  socket.on('sendMessage', (data) => {
    console.log('Message received:', data);
    io.emit('receiveMessage', data); // Broadcast pesan ke semua pengguna
  });

  // Ketika pengguna keluar
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

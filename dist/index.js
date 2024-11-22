"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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

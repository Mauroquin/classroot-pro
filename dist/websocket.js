"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const initSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: { origin: "*" }
    });
    io.on('connection', (socket) => {
        console.log('📱 Nuevo usuario conectado:', socket.id);
        // Escuchar mensajes del chat
        socket.on('enviar_mensaje', (data) => {
            // Reenviar el mensaje a todos los conectados
            io.emit('mensaje_chat', data);
        });
        socket.on('disconnect', () => {
            console.log('❌ Usuario desconectado');
        });
    });
    return io;
};
exports.initSocket = initSocket;

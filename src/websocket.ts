import { Server } from 'socket.io';

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
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

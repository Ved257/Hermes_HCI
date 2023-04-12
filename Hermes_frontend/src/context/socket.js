import React from 'react';
import socketIOClient from 'socket.io-client';
const SOCKET_URL = 'http://localhost:3001';

const socket = socketIOClient(SOCKET_URL);
const SocketContext = React.createContext(socket);

export { SocketContext, socket };

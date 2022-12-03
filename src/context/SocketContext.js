import { createContext } from 'react';

const defaultSocketProvider = {
  socket: null
};

const SocketContext = createContext(defaultSocketProvider);

export { SocketContext };

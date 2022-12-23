import { useMemo } from 'react';
import { SocketContext } from '@context';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import configs from '@configs';

const SocketProvider = ({ children }) => {
  const _ = useSelector((state) => state);

  const socketProvider = useMemo(() => {
    const socket = io(configs.basePathRestApi, {
      path: '/socket.io',
      transports: ['polling', 'websocket'],
      withCredentials: true,
      secure: true
    });

    socket.on('connect', () => {
      const { engine } = socket.io;
      console.info('transports', engine.transport.name);
      console.info('Socket ID', socket.id);
    });
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on('disconnect', () => console.info('server disconnected'));

    return {
      socket
    };
  }, []);

  return (
    <SocketContext.Provider value={socketProvider}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

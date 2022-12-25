import { useMemo } from 'react';
import { SocketContext } from '@context';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import configs from '@configs';

const SocketProvider = ({ children }) => {
  const _ = useSelector((state) => state);

  const endpoint = configs.basePathRestApi;

  const socketProvider = useMemo(() => {
    const socket = io(endpoint, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.info('Socket ID', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket err', err);
      socket.io.opts.transports = ['polling', 'websocket'];
    });

    socket.on('disconnect', (reason) => {
      console.info('Socket disconnected', reason);
    });

    return {
      socket
    };
  }, [endpoint, io]);

  return (
    <SocketContext.Provider value={socketProvider}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

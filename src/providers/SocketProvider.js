import { useMemo } from 'react';
import { SocketContext } from '@context';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import configs from '@configs';

const SocketProvider = ({ children }) => {
  const _ = useSelector((state) => state);

  const socketProvider = useMemo(() => {
    const socket = io(configs.basePathRestApi);

    socket.on('connect', () => {
      console.info('Socket ID', socket.id);
    });
    socket.on('connect_error', (err) => {
      console.info('Err:', err.message);
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on('disconnect', (reason) => {
      console.info('Server disconnected ====> reason:', reason);
    });

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

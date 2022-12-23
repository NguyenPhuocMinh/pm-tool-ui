import { useMemo } from 'react';
import { SocketContext } from '@context';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
// import configs from '@configs';

const SocketProvider = ({ children }) => {
  const _ = useSelector((state) => state);

  const socketProvider = useMemo(() => {
    const socket = io(
      'https://pm-tool-api-git-master-nguyenphuocminh.vercel.app/',
      {
        path: '/socket.io',
        transports: ['websocket'],
        withCredentials: true
      }
    );

    socket.on('connect', () => {
      const { engine } = socket.io;
      console.info('transports', engine.transport.name);
      console.info('Socket ID', socket.id);
    });
    socket.on('connect_error', (err) => {
      console.info('err', err);
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on('disconnect', (reason) => {
      console.info('server disconnected', reason);
    });

    return {
      socket
    };
  }, [io]);

  return (
    <SocketContext.Provider value={socketProvider}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

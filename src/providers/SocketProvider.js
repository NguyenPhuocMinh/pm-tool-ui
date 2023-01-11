import { useMemo } from 'react';
import { SocketContext } from '@context';
import { useSelector, useDispatch } from 'react-redux';
import { socketGetAllUserOnlineAction } from '@reduxStore/actions';
import { io } from 'socket.io-client';
import configs from '@configs';
import constants from '@constants';
import { localForage } from '@utils';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const _ = useSelector((state) => state);

  const endpoint = configs.basePathRestApi;

  const socketProvider = useMemo(() => {
    const socket = io(endpoint, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      auth: {
        token: localForage.getItemLocalForage(constants.LOCAL_FORAGE_KEYS.TOKEN)
      }
    });

    socket.on('connect', () => {
      console.info('Socket ID', socket.id);
    });

    socket.on(constants.SOCKET_USER_ONLINE, (users) => {
      dispatch(socketGetAllUserOnlineAction(users));
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

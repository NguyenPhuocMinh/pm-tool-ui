import constants from '@constants';
import { SOCKET_GET_ALL_USER_ONLINE } from '@reduxStore/types';

/**
 * USER LEAVE ROOM
 * @param {*} toolBox {socket}
 * @param {*} records {id, fullName}
 */
export const socketGetAllUserOnlineAction = (users) => (dispatch) => {
  dispatch({
    type: SOCKET_GET_ALL_USER_ONLINE,
    payload: users
  });
};

/**
 * USER LEAVE ROOM
 * @param {*} toolBox {socket}
 * @param {*} records {id, fullName}
 */
export const socketUserLogoutAction = (toolBox, records) => (_) => {
  const { socket } = toolBox;
  socket.emit(constants.SOCKET_USER_LOGOUT, {
    id: records.id,
    fullName: records.fullName,
    room: constants.SOCKET_ROOM
  });
};

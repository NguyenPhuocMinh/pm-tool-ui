import constants from '@constants';

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

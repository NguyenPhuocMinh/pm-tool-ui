import { httpClientRestProvider } from './http-service';

const basePath = '/notifyUsers';

/**
 * @description GET ALL NOTIFY OF USER SERVICE
 * @param {*} id {id of user}
 * @param {*} query
 */
export const getAllNotifyUserService = async (id, query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath, {
      params: {
        id,
        ...query
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET NOTIFY USER BY ID SERVICE
 * @param {*} id
 */
export const getNotifyUserByIdService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + `/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL DATA NOTIFY OF USER SERVICE
 * @param {*} id
 * @param {*} query
 */
export const getAllDataNotifyUserService = async (id, query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + 'Data', {
      params: {
        id,
        ...query
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL NOTIFY OF USER SERVICE
 * @param {*} id {id of user}
 * @param {*} query
 */
export const getAllDataUnreadNotifyUserService = async (id, query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + 'Unread', {
      params: {
        id,
        ...query
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description READ NOTIFY OF USER SERVICE
 * @param {*} id {id of user}
 */
export const readNotifyUserService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.patch(basePath + 'Read', {
      id
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description READ ALL NOTIFY OF USER SERVICE
 * @param {*} id {id of user}
 */
export const readAllNotifyUserService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.patch(basePath + 'Reads', {
      id
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description TRASH NOTIFY OF USER SERVICE
 * @param {*} id {id of user}
 */
export const trashNotifyUserService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.patch(basePath + 'Trash', {
      id
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description TRASH ALL NOTIFY OF USER SERVICE
 * @param {*} id
 */
export const trashAllNotifyUserService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.delete(basePath + 'Trashes', {
      params: {
        id
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL DATA TRASH NOTIFY OF USER SERVICE
 * @param {*} id
 * @param {*} query
 */
export const getAllDataTrashNotifyUserService = async (id, query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + 'Trashes', {
      params: {
        id,
        ...query
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description ROLL BACK NOTIFY OF USER SERVICE
 * @param {*} id {id of user}
 */
export const rollbackNotifyUserService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.patch(basePath + 'Rollback', {
      id
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description ROLL BACK ALL NOTIFY OF USER SERVICE
 * @param {*} id {id of user}
 */
export const rollbackAllNotifyUserService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      basePath + 'Rollbacks',
      {
        id
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const menuPermissions = {
  /**
   * ORGANIZATION
   */
  organizations: {
    GET_ALL: 'ORGANIZATION_GET_ALL',
    GET_ID: 'ORGANIZATION_GET_ID',
    CREATE: 'ORGANIZATION_CREATE',
    UPDATE: 'ORGANIZATION_UPDATE',
    DELETE: 'ORGANIZATION_DELETE'
  },
  /**
   * PROJECT
   */
  projects: {
    GET_ALL: 'PROJECT_GET_ALL',
    GET_ID: 'PROJECT_GET_ID',
    CREATE: 'PROJECT_CREATE',
    UPDATE: 'PROJECT_UPDATE',
    DELETE: 'PROJECT_DELETE'
  },
  /**
   * ROLE
   */
  roles: {
    GET_ALL: 'ROLE_GET_ALL',
    GET_ID: 'ROLE_GET_ID',
    CREATE: 'ROLE_CREATE',
    EDIT: 'ROLE_EDIT',
    DELETE: 'ROLE_DELETE'
  },
  /**
   * PERMISSION
   */
  permissions: {
    GET_ALL: 'PERMISSION_GET_ALL',
    GET_ID: 'PERMISSION_GET_ID',
    CREATE: 'PERMISSION_CREATE',
    EDIT: 'PERMISSION_EDIT',
    DELETE: 'PERMISSION_DELETE'
  },
  /**
   * USER
   */
  users: {
    GET_ALL: 'USER_GET_ALL',
    GET_ID: 'USER_GET_ID',
    CREATE: 'USER_CREATE',
    EDIT: 'USER_EDIT',
    DELETE: 'USER_DELETE'
  },
  /**
   * USER ONLINE
   */
  userOnline: {
    GET_ALL: 'USER_ONLINE_GET_ALL'
  },
  /**
   * SESSION
   */
  userSessions: {
    GET_ALL: 'USER_SESSION_GET_ALL',
    TIME_LINE: 'USER_SESSION_TIME_LINE',
    GET_ID: 'USER_SESSION_GET_ID',
    DELETE: 'USER_SESSION_DELETE'
  },
  /**
   * NOTIFY
   */
  notifies: {
    GET_ALL: 'NOTIFY_GET_ALL'
  },
  /**
   * NOTIFY TEMPLATE
   */
  notifyTemplates: {
    GET_ALL: 'NOTIFY_TEMPLATE_GET_ALL',
    CREATE: 'NOTIFY_TEMPLATE_CREATE',
    GET_ID: 'NOTIFY_TEMPLATE_GET_ID'
  },
  /**
   * NOTIFY TEMPLATE
   */
  teams: {
    GET_ALL: 'TEAM_GET_ALL',
    CREATE: 'TEAM_CREATE',
    GET_ID: 'TEAM_GET_ID',
    UPDATE: 'TEAM_UPDATE',
    DELETE: 'TEAM_DELETE'
  }
};

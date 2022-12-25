import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUserOnlineAction,
  socketUserLogoutAction,
  revokeTokenAction
} from '@reduxStore/actions';
import { get } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate, useAuth, useSocket } from '@hooks';
import { Paper, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridActionsCellItem, viVN, enUS } from '@mui/x-data-grid';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TimelineIcon from '@mui/icons-material/Timeline';
import {
  NoRowsCommon,
  LoadingCommon,
  PopupCommon,
  CardListCommon,
  SearchInput
} from '@utilities';
import constants from '@constants';
import { other, authAllowed } from '@utils';
import { menuPermissions } from '@permissions';
import { renderCellExpand } from '@regulars';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important'
    }
  },
  search: {
    width: 256
  }
}));

const UserOnlineList = () => {
  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const { whoami } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const initialValues = {
    search: ''
  };

  const formProps = useFormik({ initialValues });

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize,
      search: formProps.values.search
    }),
    [page, pageSize, formProps.values.search]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAllUserOnlineAction(queryOptions));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, queryOptions]);

  const { data, total, loading, recordsUserSession } = useSelector((state) => {
    return {
      data: get(state, 'userOnline.data', []),
      total: get(state, 'userOnline.total', 0),
      loading: get(state, 'userOnline.loading', false),
      recordsUserSession: get(state, 'userSession.records', {})
    };
  });

  const handleTimelineSession = useCallback(
    (userID) => () => {
      navigate(`/users/sessions/${userID}`);
    },
    []
  );

  const handleRevokeSession = useCallback(
    (userID) => () => {
      const toolBox = { navigate, socket };
      const records = {
        id: userID,
        sessionID: recordsUserSession.id
      };
      dispatch(socketUserLogoutAction(toolBox, records));
      dispatch(revokeTokenAction(records));
    },
    []
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'fullName',
        headerName: translate('resources.usersOnline.fields.user'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          return (
            <Typography
              sx={{
                color: 'inherit'
              }}
              component="a"
              href={`/users/edit/${params.row.id}`}
            >
              {params.value}
            </Typography>
          );
        }
      },
      {
        field: 'userAgent',
        headerName: translate('resources.usersOnline.fields.userAgent'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        renderCell: renderCellExpand
      },
      {
        field: 'ipAddress',
        headerName: translate('resources.usersOnline.fields.ipAddress'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        renderCell: renderCellExpand
      },
      {
        field: 'lastAccess',
        headerName: translate('resources.usersOnline.fields.lastAccess'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: () => new Date()
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: translate('common.actions.title'),
        flex: 0.5,
        getActions: (params) => {
          if (
            authAllowed({
              whoami,
              permission: menuPermissions.userOnline.LIST
            })
          ) {
            return [
              <GridActionsCellItem
                icon={<TimelineIcon />}
                onClick={handleTimelineSession(params.id)}
                label={translate('common.label.timeline')}
                key={params.id}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<ExitToAppIcon />}
                onClick={handleRevokeSession(params.id)}
                label={translate('common.label.revoke')}
                key={params.id}
                showInMenu
              />
            ];
          }
          return [];
        }
      }
    ];
  }, [handleRevokeSession, handleTimelineSession, translate, i18n.language]);

  return (
    <Box display="block">
      <CardListCommon resource="usersOnline" />
      <Box
        sx={{
          marginBottom: '1em',
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <SearchInput
          label="common.search"
          id="search"
          source="search"
          size="small"
          variant="standard"
          placeholder="resources.usersOnline.search"
          className={classes.search}
          {...formProps}
        />
      </Box>
      <Paper elevation={3}>
        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            localeText={
              i18n.language === constants.LANGUAGES.EN
                ? enUS.components.MuiDataGrid.defaultProps.localeText
                : viVN.components.MuiDataGrid.defaultProps.localeText
            }
            loading={loading}
            rows={data}
            rowCount={total}
            columns={columns}
            page={page}
            pageSize={pageSize}
            onPageChange={handleOnPageChange}
            onPageSizeChange={handleOnPageSizeChange}
            rowsPerPageOptions={[5, 10, 20, 100]}
            pagination
            disableColumnMenu
            components={{
              NoRowsOverlay: NoRowsCommon,
              LoadingOverlay: LoadingCommon
            }}
            classes={{
              root: classes.dataGridRoot
            }}
            {...other}
          />
        </Box>
      </Paper>
      <PopupCommon />
    </Box>
  );
};

export default UserOnlineList;

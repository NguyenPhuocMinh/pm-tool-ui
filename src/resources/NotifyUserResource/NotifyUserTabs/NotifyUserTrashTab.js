import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate, useAuth } from '@hooks';
import {
  getAllDataTrashNotifyUserAction,
  trashAllNotifyUserAction,
  rollbackNotifyUserAction,
  rollbackAllNotifyUserAction
} from '@reduxStore/actions';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import {
  PopupCommon,
  SearchInput,
  TableGridCommon,
  ButtonRegular
} from '@utilities';
import { dateTimeFormat } from '@utils';
import { convertData } from '@helpers';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
  },
  search: {
    width: 256
  }
}));

const NotifyUserTrashTab = () => {
  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const { whoami } = useAuth();

  const handleOnPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const dispatch = useDispatch();

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

  const { refresh, color } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh'),
      color: get(state, 'common.color')
    };
  });

  useEffect(() => {
    dispatch(getAllDataTrashNotifyUserAction(whoami?.id, queryOptions));
  }, [dispatch, queryOptions, refresh, whoami]);

  const { data, total, loading } = useSelector((state) => {
    const notifyUsers = get(state, 'notifyUser.dataTrash', []);
    const dataConvert = convertData(notifyUsers);

    return {
      data: dataConvert,
      total: get(state, 'notifyUser.totalTrash', 0),
      loading: get(state, 'notifyUser.loading', false)
    };
  });

  const handleRollback = useCallback(
    (id) => () => {
      dispatch(rollbackNotifyUserAction(id, whoami?.id, queryOptions));
    },
    [dispatch, whoami, queryOptions]
  );

  const handleRemoveAll = useCallback(() => {
    dispatch(trashAllNotifyUserAction(whoami?.id, queryOptions));
  }, [dispatch, whoami, queryOptions]);

  const handleRollbackAll = useCallback(() => {
    dispatch(rollbackAllNotifyUserAction(whoami?.id, queryOptions));
  }, [dispatch, whoami, queryOptions]);

  const columns = useMemo(() => {
    return [
      {
        field: 'topic',
        headerName: translate('resources.notifyUsers.fields.topic'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'description',
        headerName: translate('resources.notifyUsers.fields.description'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'createdAt',
        headerName: translate('resources.notifyUsers.fields.sentAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'isRead',
        headerName: translate('resources.notifyUsers.fields.isRead'),
        type: 'boolean',
        flex: 0.5,
        sortable: false,
        resizable: false,
        filterable: false,
        hideMenu: false
      },
      {
        field: 'deleted',
        headerName: translate('resources.notifyUsers.fields.deleted'),
        type: 'boolean',
        flex: 0.5,
        sortable: false,
        resizable: false,
        filterable: false,
        hideMenu: false
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: translate('common.actions.title'),
        flex: 0.5,
        getActions: (params) => {
          return [
            <GridActionsCellItem
              key={params.id}
              label={translate('common.label.rollback')}
              showInMenu
              icon={<ReplyAllIcon />}
              onClick={handleRollback(params.id)}
            />
          ];
        }
      }
    ];
  }, [handleRollback, queryOptions, translate, i18n.language]);

  return (
    <Box display="block">
      <Box
        sx={{
          marginBottom: '1em',
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
          placeholder="resources.notifyUsers.search"
          className={classes.search}
          {...formProps}
        />
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            flexWrap: 'wrap',
            justifyItems: 'center'
          }}
        >
          <Box width="auto" minWidth={50} margin="0 10px">
            <ButtonRegular
              sx={{
                ':hover': {
                  background: color?.hex
                },
                background: color?.hex,
                color: (theme) => theme.palette.common.white
              }}
              variant="contained"
              disabled={data.length > 0 ? false : true}
              loading={loading}
              label="common.label.removeAll"
              onClick={handleRemoveAll}
            />
          </Box>
          <Box width="auto" minWidth={50} margin="0 10px">
            <ButtonRegular
              sx={{
                ':hover': {
                  background: color?.hex
                },
                background: color?.hex,
                color: (theme) => theme.palette.common.white
              }}
              variant="contained"
              disabled={data.length > 0 ? false : true}
              loading={loading}
              label="common.label.rollbackAll"
              onClick={handleRollbackAll}
            />
          </Box>
        </Box>
      </Box>
      <Paper elevation={3}>
        <TableGridCommon
          loading={loading}
          rows={data}
          rowCount={total}
          columns={columns}
          page={page}
          pageSize={pageSize}
          onPageChange={handleOnPageChange}
          onPageSizeChange={handleOnPageSizeChange}
        />
      </Paper>
      <PopupCommon />
    </Box>
  );
};

export default NotifyUserTrashTab;

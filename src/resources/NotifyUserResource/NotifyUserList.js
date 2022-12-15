import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate, useAuth } from '@hooks';
import { getAllNotifyUserAction } from '@reduxStore/actions';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DetailsIcon from '@mui/icons-material/Details';
import {
  PopupCommon,
  SearchInput,
  CardListCommon,
  TableGridCommon
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

const NotifyUserList = () => {
  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const navigate = useNavigate();
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

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  useEffect(() => {
    dispatch(getAllNotifyUserAction(whoami?.id, queryOptions));
  }, [dispatch, queryOptions, refresh, whoami]);

  const { data, total, loading } = useSelector((state) => {
    const notifyUsers = get(state, 'notifyUser.data', []);
    const dataConvert = convertData(notifyUsers);

    return {
      data: dataConvert,
      total: get(state, 'notifyUser.total', 0),
      loading: get(state, 'notifyUser.loading', false)
    };
  });

  const handleView = useCallback(
    (id) => () => {
      navigate(`/notify/users/${id}`);
    },
    [navigate]
  );

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
              label={translate('common.label.detail')}
              showInMenu
              icon={<DetailsIcon />}
              onClick={handleView(params.id)}
            />
          ];
        }
      }
    ];
  }, [handleView, queryOptions, translate, i18n.language]);

  return (
    <Box display="block">
      <CardListCommon resource="notifyUsers" />
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
          placeholder="resources.notifyUsers.search"
          className={classes.search}
          {...formProps}
        />
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

export default NotifyUserList;

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate, useAuth } from '@hooks';
import { getAllNotifyTemplateAction } from '@reduxStore/actions';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  PopupCommon,
  ButtonCreate,
  SearchInput,
  CardListCommon,
  TableGridCommon
} from '@utilities';
import { dateTimeFormat, authAllowed } from '@utils';
import { menuPermissions } from '@permissions';
import { convertNotifyType } from '@helpers';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
  },
  search: {
    width: 256
  }
}));

const NotifyTemplateList = () => {
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
    dispatch(getAllNotifyTemplateAction(queryOptions));
  }, [dispatch, queryOptions, refresh]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'notifyTemplate.data', []),
      total: get(state, 'notifyTemplate.total', 0),
      loading: get(state, 'notifyTemplate.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/notify-templates/edit/${id}`);
    },
    [navigate]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'topic',
        headerName: translate('resources.notifyTemplates.fields.topic'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'description',
        headerName: translate('resources.notifyTemplates.fields.description'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'content',
        headerName: translate('resources.notifyTemplates.fields.content'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'type',
        headerName: translate('resources.notifyTemplates.fields.type'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) =>
          !isEmpty(value) ? convertNotifyType(value, translate) : '-'
      },
      {
        field: 'createdAt',
        headerName: translate('resources.permissions.fields.createdAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'updatedAt',
        headerName: translate('resources.permissions.fields.updatedAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
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
              permission: menuPermissions.notifyTemplates.GET_ID
            })
          ) {
            return [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="common.label.delete"
                key={params.id}
              />,
              <GridActionsCellItem
                icon={<BorderColorIcon />}
                onClick={handleEdit(params.id)}
                label="common.label.edit"
                key={params.id}
              />
            ];
          }
          return [];
        }
      }
    ];
  }, [handleEdit, queryOptions, translate, i18n.language]);

  return (
    <Box display="block">
      <CardListCommon resource="notifyTemplates" />
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
          placeholder="resources.notifyTemplates.search"
          className={classes.search}
          {...formProps}
        />
        {authAllowed({
          whoami,
          permission: menuPermissions.notifyTemplates.CREATE
        }) && (
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
            <Box width="auto" minWidth={50}>
              <ButtonCreate
                label="common.label.create"
                redirect="/notify-templates/create"
              />
            </Box>
          </Box>
        )}
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

export default NotifyTemplateList;

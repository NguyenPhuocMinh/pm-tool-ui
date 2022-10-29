import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showPopup } from '@reduxStore/actions';
import moment from 'moment';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import {
  NoRowsCommon,
  PopupCommon,
  ButtonCreate,
  SearchInput
} from '@components';
import constants from '@constants';
import {
  GRID_EN_LOCALE_TEXT,
  GRID_VN_LOCALE_TEXT
} from '@i18nStore/localeTexts';
import { other } from '@utils';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

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
    width: 300
  }
}));

const OrganizationList = () => {
  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: constants.SORT_DEFAULT,
      sort: constants.SORT_ORDER
    }
  ]);
  const [sort, setSort] = useState(sortModel[0]?.field);
  const [order, setOrder] = useState(sortModel[0]?.sort);

  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const navigate = useNavigate();

  const handleOnPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const handleOnSortModelChange = useCallback((newSortModel) => {
    setSortModel(newSortModel);
    const _newSortModel = newSortModel[0];

    setSort(
      !isEmpty(_newSortModel) ? _newSortModel.field : constants.SORT_DEFAULT
    );
    setOrder(
      !isEmpty(_newSortModel) ? _newSortModel.sort : constants.SORT_ORDER
    );
  }, []);

  const dispatch = useDispatch();

  const initialValues = {
    search: ''
  };

  const formProps = useFormik({ initialValues });

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize,
      _sort: sort,
      _order: order,
      search: formProps.values.search
    }),
    [page, pageSize, sort, order, formProps.values.search]
  );

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'realm.data', []),
      total: get(state, 'realm.total', 0),
      loading: get(state, 'realm.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/realm-edit/${id}`);
    },
    [navigate]
  );

  const handleShowPopupDelete = useCallback(
    (name) => () => {
      dispatch(
        showPopup({
          open: true,
          title: 'resources.configures.realms.popup.title',
          content: 'resources.configures.realms.popup.content',
          // onSubmit: () => dispatch(deleteRealmByIdAction(id, query)),
          options: {
            realmName: name
          }
        })
      );
    },
    [dispatch]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: translate('resources.configures.realms.fields.name'),
        flex: 0.5,
        resizable: false,
        filterable: false
      },
      {
        field: 'titleName',
        headerName: translate('resources.configures.realms.fields.titleName'),
        flex: 1,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'activated',
        headerName: translate('resources.configures.realms.fields.activated'),
        type: 'boolean',
        flex: 0.5,
        sortable: false,
        resizable: false,
        filterable: false,
        hideMenu: false
      },
      {
        field: 'createdAt',
        headerName: translate('resources.configures.realms.fields.createdAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) =>
          value && moment(new Date(value)).format('DD-MM-YYYY h:mm:ss A')
      },
      {
        field: 'actions',
        headerName: translate('actions.title'),
        type: 'actions',
        flex: 0.3,
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              onClick={handleShowPopupDelete(
                params.id,
                params.row.name,
                queryOptions
              )}
              label="Delete"
              key={params.id}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              onClick={handleEdit(params.id)}
              label="Edit"
              key={params.id}
            />
          ];
        }
      }
    ];
  }, [
    handleEdit,
    handleShowPopupDelete,
    queryOptions,
    translate,
    i18n.language
  ]);

  return (
    <Box display="block">
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
          placeholder="resources.configures.realms.search"
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
          <Box width="auto" minWidth={50}>
            <ButtonCreate redirect="/organizations/create" />
          </Box>
        </Box>
      </Box>
      <Paper elevation={3}>
        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            localeText={
              i18n.language === 'en' ? GRID_EN_LOCALE_TEXT : GRID_VN_LOCALE_TEXT
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
            paginationMode="server"
            sortModel={sortModel}
            onSortModelChange={handleOnSortModelChange}
            sortingMode="server"
            disableColumnMenu
            components={{
              NoRowsOverlay: NoRowsCommon
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

export default OrganizationList;

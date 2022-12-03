import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  showPopup,
  getAllProjectAction,
  deleteProjectByIdAction
} from '@reduxStore/actions';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate, useAuth } from '@hooks';
import {
  PopupCommon,
  SearchInput,
  ButtonCreate,
  CardListCommon,
  TableGridCommon
} from '@utilities';
import constants from '@constants';
import { dateTimeFormat, authAllowed } from '@utils';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { menuPermissions } from '@permissions';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important',
      '&:hover': {
        background: 'none !important'
      }
    }
  },
  search: {
    width: 256
  }
}));

const ProjectList = () => {
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
  const { whoami } = useAuth();

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

  useEffect(() => {
    dispatch(getAllProjectAction(queryOptions));
  }, [dispatch, queryOptions]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'project.data', []),
      total: get(state, 'project.total', 0),
      loading: get(state, 'project.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/projects/edit/${id}`);
    },
    [navigate]
  );

  const handleShowPopupDelete = useCallback(
    (id, name, query) => () => {
      dispatch(
        showPopup({
          open: true,
          title: 'resources.projects.popup.title',
          content: 'resources.projects.popup.content',
          verifyName: 'resources.projects.popup.verifyName',
          onSubmit: () => dispatch(deleteProjectByIdAction(id, query)),
          options: {
            projectName: name
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
        headerName: translate('resources.projects.fields.name'),
        flex: 0.5,
        resizable: false,
        filterable: false
      },
      {
        field: 'activated',
        headerName: translate('resources.projects.fields.activated'),
        type: 'boolean',
        flex: 0.5,
        sortable: false,
        resizable: false,
        filterable: false,
        hideMenu: false
      },
      {
        field: 'createdAt',
        headerName: translate('resources.projects.fields.createdAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'updatedAt',
        headerName: translate('resources.projects.fields.updatedAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'actions',
        headerName: translate('common.actions.title'),
        type: 'actions',
        flex: 0.3,
        getActions: (params) => {
          if (
            authAllowed({
              whoami,
              permission: menuPermissions.projects.GET_ID
            })
          ) {
            return [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                onClick={handleShowPopupDelete(
                  params.id,
                  params.row.name,
                  queryOptions
                )}
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
  }, [
    handleEdit,
    handleShowPopupDelete,
    queryOptions,
    translate,
    i18n.language
  ]);

  return (
    <Box display="block">
      <CardListCommon resource="projects" />
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
          placeholder="resources.projects.search"
          className={classes.search}
          {...formProps}
        />
        {authAllowed({
          whoami,
          permission: menuPermissions.projects.CREATE
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
              <ButtonCreate redirect="/projects/create" />
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
          sortModel={sortModel}
          onPageChange={handleOnPageChange}
          onPageSizeChange={handleOnPageSizeChange}
          handleOnSortModelChange={handleOnSortModelChange}
        />
      </Paper>
      <PopupCommon />
    </Box>
  );
};

export default ProjectList;

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProjectInOrganizationAction } from '@reduxStore/actions';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate, useAuth } from '@hooks';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridActionsCellItem, viVN, enUS } from '@mui/x-data-grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { NoRowsCommon, ButtonRegular, SearchInput } from '@utilities';
import constants from '@constants';
import { other, authAllowed } from '@utils';
import { menuPermissions } from '@permissions';

const useStyles = makeStyles({
  input: {
    width: 350
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important',
      '&:hover': {
        background: 'none !important'
      }
    }
  }
});

const ProjectsInOrganizationTab = (props) => {
  const { projectId } = props;
  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { whoami } = useAuth();

  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

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
    [page, pageSize]
  );

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  useEffect(() => {
    dispatch(getAllProjectInOrganizationAction(projectId, queryOptions));
  }, [dispatch, projectId, queryOptions, refresh]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'role.dataPermissionsInRole', []),
      total: get(state, 'role.totalPermissionsInRole', 0),
      loading: get(state, 'role.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/permissions/edit/${id}`);
    },
    [navigate]
  );

  const handleClickCreateProject = () => {
    navigate('/projects/create');
  };

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: translate('resources.projects.fields.name'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'description',
        headerName: translate('resources.projects.fields.description'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: translate('common.actions.title'),
        flex: 0.5,
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={<BorderColorIcon />}
              onClick={handleEdit(params.id)}
              label="Edit"
              key={params.id}
            />
          ];
        }
      }
    ];
  }, [handleEdit, queryOptions, translate, i18n.language]);

  return (
    <Box sx={{ minWidth: 400 }}>
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
              <ButtonRegular
                label="resources.organizations.labels.createProject"
                variant="contained"
                onClick={handleClickCreateProject}
              />
            </Box>
          </Box>
        )}
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
            paginationMode="server"
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
    </Box>
  );
};

export default ProjectsInOrganizationTab;

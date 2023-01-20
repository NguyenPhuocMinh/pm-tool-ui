import { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllProjectInOrganizationAction,
  getAllProjectNotOnOrganizationAction,
  addProjectsToOrganizationAction,
  removeProjectsFromOrganizationAction
} from '@reduxStore/actions';
// hooks
import { useTranslate, useAuth } from '@hooks';
import { useFormik } from 'formik';
// mui
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  SearchInput,
  ButtonRegular,
  DialogCommon,
  TableGridCommon,
  TypoCommon
} from '@utilities';
// other
import { get, isEmpty } from 'lodash';
import { authAllowed } from '@utils';
import { menuPermissions } from '@permissions';
import { validatorAddProjectToOrganization } from '@validators';

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

const SetProjectToOrganizationTab = (props) => {
  const { organizationId, records } = props;
  // states
  const [openDialog, setOpenDialog] = useState(false);
  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { whoami } = useAuth();

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  // projects in organization
  const [pageProjectsInOrganization, setPageProjectsInOrganization] =
    useState(0);
  const [pageSizeProjectsInOrganization, setPageSizeProjectsInOrganization] =
    useState(5);

  const handleOnPageChangeProjectsInOrganization = (
    newPageProjectsInOrganization
  ) => {
    setPageProjectsInOrganization(newPageProjectsInOrganization);
  };

  const handleOnPageSizeChangeProjectsInOrganization = (
    newPageSizeProjectsInOrganization
  ) => {
    setPageSizeProjectsInOrganization(newPageSizeProjectsInOrganization);
  };

  const initialSearchProjectInOrganization = {
    search: ''
  };

  const formPropsSearchProjectInOrganization = useFormik({
    initialValues: initialSearchProjectInOrganization
  });

  const queryOptionsProjectsInOrganization = useMemo(
    () => ({
      _start: pageProjectsInOrganization * pageSizeProjectsInOrganization,
      _end:
        pageProjectsInOrganization * pageSizeProjectsInOrganization +
        pageSizeProjectsInOrganization,
      search: formPropsSearchProjectInOrganization.values.search
    }),
    [
      pageProjectsInOrganization,
      pageSizeProjectsInOrganization,
      formPropsSearchProjectInOrganization.values.search
    ]
  );

  useEffect(() => {
    dispatch(
      getAllProjectInOrganizationAction(
        organizationId,
        queryOptionsProjectsInOrganization
      )
    );
  }, [dispatch, organizationId, queryOptionsProjectsInOrganization, refresh]);

  const { dataProjectInOrganization, totalProjectInOrganization, loading } =
    useSelector((state) => {
      return {
        dataProjectInOrganization: get(
          state,
          'organization.dataProjectInOrganization',
          []
        ),
        totalProjectInOrganization: get(
          state,
          'organization.totalProjectInOrganization',
          0
        ),
        loading: get(state, 'organization.loading', false)
      };
    });

  // projects not on project
  const [pageProjectsNotOnOrganization, setPageProjectsNotOnOrganization] =
    useState(0);
  const [pageSizeProjectsNotOnOrganization, setPageSizeProjectsNotOnTeam] =
    useState(5);

  const initialSearchProjectsNotOnOrganization = {
    search: ''
  };

  const formPropsProjectsNotOnOrganization = useFormik({
    initialValues: initialSearchProjectsNotOnOrganization
  });

  const handleOnPageChangeProjectsNotOnOrganization = (
    newPageProjectNotOnOrganization
  ) => {
    setPageProjectsNotOnOrganization(newPageProjectNotOnOrganization);
  };

  const handleOnPageSizeChangeProjectsNotOnOrganization = (
    newPageSizeProjectNotOnTeam
  ) => {
    setPageSizeProjectsNotOnTeam(newPageSizeProjectNotOnTeam);
  };

  const queryOptionsProjectsNotOnOrganization = useMemo(
    () => ({
      _start: pageProjectsNotOnOrganization * pageSizeProjectsNotOnOrganization,
      _end:
        pageProjectsNotOnOrganization * pageSizeProjectsNotOnOrganization +
        pageSizeProjectsNotOnOrganization,
      search: formPropsProjectsNotOnOrganization.values.search
    }),
    [
      pageProjectsNotOnOrganization,
      pageSizeProjectsNotOnOrganization,
      formPropsProjectsNotOnOrganization.values.search
    ]
  );

  useEffect(() => {
    dispatch(
      getAllProjectNotOnOrganizationAction(
        organizationId,
        queryOptionsProjectsNotOnOrganization
      )
    );
  }, [
    dispatch,
    organizationId,
    queryOptionsProjectsNotOnOrganization,
    refresh
  ]);

  const { dataProjectNotOnOrganization, totalProjectNotOnOrganization } =
    useSelector((state) => {
      return {
        dataProjectNotOnOrganization: get(
          state,
          'organization.dataProjectNotOnOrganization',
          []
        ),
        totalProjectNotOnOrganization: get(
          state,
          'organization.totalProjectNotOnOrganization',
          0
        )
      };
    });

  const initialValueAddProjects = {
    projects: []
  };

  const { handleReset, setValues, values, isValid, dirty } = useFormik({
    initialValues: initialValueAddProjects,
    validationSchema: validatorAddProjectToOrganization(translate)
  });

  const initialValueRemoveProjects = {
    projects: []
  };

  const { setValues: setValuesRemoveProject, values: valuesRemoveProject } =
    useFormik({
      initialValues: initialValueRemoveProjects,
      validationSchema: validatorAddProjectToOrganization(translate)
    });

  const handleSelectionModelChange = (selectionModelAddProjects) => {
    setValues({ projects: selectionModelAddProjects });
  };

  const handleSelectionModelChangeRemoveProjects = (
    selectionModelRemoveProjects
  ) => {
    setValuesRemoveProject({ projects: selectionModelRemoveProjects });
  };

  const handleConfirm = useCallback(() => {
    dispatch(addProjectsToOrganizationAction(organizationId, values));
    setOpenDialog(false);
  }, [dispatch, organizationId, values]);

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/projects/edit/${id}`);
    },
    [navigate]
  );

  const handleClickAddProject = () => {
    setOpenDialog(true);
  };

  const handleClickRemoveProject = useCallback(() => {
    dispatch(
      removeProjectsFromOrganizationAction(organizationId, valuesRemoveProject)
    );
  }, [dispatch, organizationId, valuesRemoveProject]);

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
  }, [handleEdit, translate, i18n.language]);

  return !records.activated ? (
    <Box>
      <TypoCommon
        variant="body2"
        fontWeight={600}
        label="resources.organizations.labels.activate"
      />
    </Box>
  ) : (
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
          {...formPropsSearchProjectInOrganization}
        />
        {authAllowed({
          whoami,
          permission: menuPermissions.organizations.UPDATE
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
            <Box width="auto" marginRight="10px" minWidth={50}>
              <ButtonRegular
                variant="contained"
                label="resources.organizations.labels.addProject"
                onClick={handleClickAddProject}
              />
            </Box>
            <Box width="auto" minWidth={50}>
              <ButtonRegular
                variant="contained"
                label="resources.organizations.labels.removeProject"
                onClick={handleClickRemoveProject}
                disabled={
                  valuesRemoveProject.projects.length > 0 ? false : true
                }
              />
            </Box>
          </Box>
        )}
      </Box>
      <Paper elevation={3}>
        <TableGridCommon
          loading={loading}
          rows={dataProjectInOrganization}
          rowCount={totalProjectInOrganization}
          columns={columns}
          page={pageProjectsInOrganization}
          pageSize={pageSizeProjectsInOrganization}
          onPageChange={handleOnPageChangeProjectsInOrganization}
          onPageSizeChange={handleOnPageSizeChangeProjectsInOrganization}
          onSelectionModelChange={handleSelectionModelChangeRemoveProjects}
          checkboxSelection
        />
      </Paper>
      <DialogCommon
        open={openDialog}
        setOpen={setOpenDialog}
        title="resources.projects.dialog.title"
        content="resources.projects.dialog.content"
        handleConfirm={handleConfirm}
        handleReset={handleReset}
        isLoading={loading}
        isValid={isValid}
        dirty={dirty}
        contentBody={
          <Fragment>
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
                {...formPropsProjectsNotOnOrganization}
              />
            </Box>
            <TableGridCommon
              loading={loading}
              rows={dataProjectNotOnOrganization}
              rowCount={totalProjectNotOnOrganization}
              columns={columns}
              page={pageProjectsNotOnOrganization}
              pageSize={pageSizeProjectsNotOnOrganization}
              onPageChange={handleOnPageChangeProjectsNotOnOrganization}
              onPageSizeChange={handleOnPageSizeChangeProjectsNotOnOrganization}
              onSelectionModelChange={handleSelectionModelChange}
              checkboxSelection
            />
          </Fragment>
        }
      />
    </Box>
  );
};

export default SetProjectToOrganizationTab;

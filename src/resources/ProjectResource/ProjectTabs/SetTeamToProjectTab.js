import { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllTeamInProjectAction,
  getAllTeamNotOnProjectAction,
  addTeamsToProjectAction,
  removeTeamsFromProjectAction
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
import { validatorAddTeamToProject } from '@validators';

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

const SetTeamToProjectTab = (props) => {
  const { projectId, records } = props;
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

  // projects in projects
  const [pageTeamsInProject, setPageTeamsInProject] = useState(0);
  const [pageSizeTeamsInProject, setPageSizeTeamsInProject] = useState(5);

  const handleOnPageChangeTeamsInProject = (newPageTeamsInTeam) => {
    setPageTeamsInProject(newPageTeamsInTeam);
  };

  const handleOnPageSizeChangeTeamsInProject = (newPageSizeTeamsInTeam) => {
    setPageSizeTeamsInProject(newPageSizeTeamsInTeam);
  };

  const initialSearchTeamInProject = {
    search: ''
  };

  const formPropsSearchTeamInProject = useFormik({
    initialValues: initialSearchTeamInProject
  });

  const queryOptionsTeamsInProject = useMemo(
    () => ({
      _start: pageTeamsInProject * pageSizeTeamsInProject,
      _end:
        pageTeamsInProject * pageSizeTeamsInProject + pageSizeTeamsInProject,
      search: formPropsSearchTeamInProject.values.search
    }),
    [
      pageTeamsInProject,
      pageSizeTeamsInProject,
      formPropsSearchTeamInProject.values.search
    ]
  );

  useEffect(() => {
    dispatch(getAllTeamInProjectAction(projectId, queryOptionsTeamsInProject));
  }, [dispatch, projectId, queryOptionsTeamsInProject, refresh]);

  const { dataTeamInProject, totalTeamInProject, loading } = useSelector(
    (state) => {
      return {
        dataTeamInProject: get(state, 'project.dataTeamInProject', []),
        totalTeamInProject: get(state, 'project.totalTeamInProject', 0),
        loading: get(state, 'project.loading', false)
      };
    }
  );

  // teams not on project
  const [pageTeamsNotOnProject, setPageTeamsNotOnProject] = useState(0);
  const [pageSizeTeamsNotOnProject, setPageSizeTeamsNotOnTeam] = useState(5);

  const initialSearchTeamsNotOnProject = {
    search: ''
  };

  const formPropsTeamsNotOnProject = useFormik({
    initialValues: initialSearchTeamsNotOnProject
  });

  const handleOnPageChangeTeamsNotOnProject = (newPageTeamNotOnProject) => {
    setPageTeamsNotOnProject(newPageTeamNotOnProject);
  };

  const handleOnPageSizeChangeTeamsNotOnProject = (
    newPageSizeTeamNotOnTeam
  ) => {
    setPageSizeTeamsNotOnTeam(newPageSizeTeamNotOnTeam);
  };

  const queryOptionsTeamsNotOnProject = useMemo(
    () => ({
      _start: pageTeamsNotOnProject * pageSizeTeamsNotOnProject,
      _end:
        pageTeamsNotOnProject * pageSizeTeamsNotOnProject +
        pageSizeTeamsNotOnProject,
      search: formPropsTeamsNotOnProject.values.search
    }),
    [
      pageTeamsNotOnProject,
      pageSizeTeamsNotOnProject,
      formPropsTeamsNotOnProject.values.search
    ]
  );

  useEffect(() => {
    dispatch(
      getAllTeamNotOnProjectAction(projectId, queryOptionsTeamsNotOnProject)
    );
  }, [dispatch, projectId, queryOptionsTeamsNotOnProject, refresh]);

  const { dataTeamNotOnProject, totalTeamNotOnProject } = useSelector(
    (state) => {
      return {
        dataTeamNotOnProject: get(state, 'project.dataTeamNotOnProject', []),
        totalTeamNotOnProject: get(state, 'project.totalTeamNotOnProject', 0)
      };
    }
  );

  const initialValueAddTeams = {
    teams: []
  };

  const { handleReset, setValues, values, isValid, dirty } = useFormik({
    initialValues: initialValueAddTeams,
    validationSchema: validatorAddTeamToProject(translate)
  });

  const initialValueRemoveTeams = {
    teams: []
  };

  const { setValues: setValuesRemoveTeam, values: valuesRemoveTeam } =
    useFormik({
      initialValues: initialValueRemoveTeams,
      validationSchema: validatorAddTeamToProject(translate)
    });

  const handleSelectionModelChange = (selectionModelAddTeams) => {
    setValues({ teams: selectionModelAddTeams });
  };

  const handleSelectionModelChangeRemoveTeams = (selectionModelRemoveTeams) => {
    setValuesRemoveTeam({ teams: selectionModelRemoveTeams });
  };

  const handleConfirm = useCallback(() => {
    dispatch(addTeamsToProjectAction(projectId, values));
    setOpenDialog(false);
  }, [dispatch, projectId, values]);

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/teams/edit/${id}`);
    },
    [navigate]
  );

  const handleClickAddTeam = () => {
    setOpenDialog(true);
  };

  const handleClickRemoveTeam = useCallback(() => {
    dispatch(removeTeamsFromProjectAction(projectId, valuesRemoveTeam));
  }, [dispatch, projectId, valuesRemoveTeam]);

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: translate('resources.teams.fields.name'),
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
        label="resources.projects.labels.activate"
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
          {...formPropsSearchTeamInProject}
        />
        {authAllowed({
          whoami,
          permission: menuPermissions.projects.UPDATE
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
                label="resources.projects.labels.addTeam"
                onClick={handleClickAddTeam}
              />
            </Box>
            <Box width="auto" minWidth={50}>
              <ButtonRegular
                variant="contained"
                label="resources.projects.labels.removeTeam"
                onClick={handleClickRemoveTeam}
                disabled={valuesRemoveTeam.teams.length > 0 ? false : true}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Paper elevation={3}>
        <TableGridCommon
          loading={loading}
          rows={dataTeamInProject}
          rowCount={totalTeamInProject}
          columns={columns}
          page={pageTeamsInProject}
          pageSize={pageSizeTeamsInProject}
          onPageChange={handleOnPageChangeTeamsInProject}
          onPageSizeChange={handleOnPageSizeChangeTeamsInProject}
          onSelectionModelChange={handleSelectionModelChangeRemoveTeams}
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
                placeholder="resources.teams.search"
                className={classes.search}
                {...formPropsTeamsNotOnProject}
              />
            </Box>
            <TableGridCommon
              loading={loading}
              rows={dataTeamNotOnProject}
              rowCount={totalTeamNotOnProject}
              columns={columns}
              page={pageTeamsNotOnProject}
              pageSize={pageSizeTeamsNotOnProject}
              onPageChange={handleOnPageChangeTeamsNotOnProject}
              onPageSizeChange={handleOnPageSizeChangeTeamsNotOnProject}
              onSelectionModelChange={handleSelectionModelChange}
              checkboxSelection
            />
          </Fragment>
        }
      />
    </Box>
  );
};

export default SetTeamToProjectTab;

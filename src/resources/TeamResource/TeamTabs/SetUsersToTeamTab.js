import { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllMemberInTeamAction,
  getAllMemberNotOnTeamAction,
  addMembersToTeamAction,
  removeMembersFromTeamAction
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
import { validatorAddMemberToTeam } from '@validators';

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

const SetUsersInTeamTab = (props) => {
  const { teamId, records } = props;
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

  // members in team
  const [pageMembersInTeam, setPageMembersInTeam] = useState(0);
  const [pageSizeMembersInTeam, setPageSizeMembersInTeam] = useState(5);

  const handleOnPageChangeMembersInTeam = (newPageMembersInTeam) => {
    setPageMembersInTeam(newPageMembersInTeam);
  };

  const handleOnPageSizeChangeMembersInTeam = (newPageSizeMembersInTeam) => {
    setPageSizeMembersInTeam(newPageSizeMembersInTeam);
  };

  const initialSearchMemberInTeam = {
    search: ''
  };

  const formPropsSearchMemberInTeam = useFormik({
    initialValues: initialSearchMemberInTeam
  });

  const queryOptionsMembersInTeam = useMemo(
    () => ({
      _start: pageMembersInTeam * pageSizeMembersInTeam,
      _end: pageMembersInTeam * pageSizeMembersInTeam + pageSizeMembersInTeam,
      search: formPropsSearchMemberInTeam.values.search
    }),
    [
      pageMembersInTeam,
      pageSizeMembersInTeam,
      formPropsSearchMemberInTeam.values.search
    ]
  );

  useEffect(() => {
    dispatch(getAllMemberInTeamAction(teamId, queryOptionsMembersInTeam));
  }, [dispatch, teamId, queryOptionsMembersInTeam, refresh]);

  const { dataMembersInTeam, totalMembersInTeam, loading } = useSelector(
    (state) => {
      return {
        dataMembersInTeam: get(state, 'team.dataMembersInTeam', []),
        totalMembersInTeam: get(state, 'team.totalMembersInTeam', 0),
        loading: get(state, 'team.loading', false)
      };
    }
  );

  // members not on team
  const [pageMembersNotOnTeam, setPageMembersNotOnTeam] = useState(0);
  const [pageSizeMembersNotOnTeam, setPageSizeMembersNotOnTeam] = useState(5);

  const initialSearchMembersNotOnTeam = {
    search: ''
  };

  const formPropsMembersNotOnTeamAddMember = useFormik({
    initialValues: initialSearchMembersNotOnTeam
  });

  const handleOnPageChangeMembersNotOnTeam = (newPageMemberNotOnTeam) => {
    setPageMembersNotOnTeam(newPageMemberNotOnTeam);
  };

  const handleOnPageSizeChangeMembersNotOnTeam = (
    newPageSizeMemberNotOnTeam
  ) => {
    setPageSizeMembersNotOnTeam(newPageSizeMemberNotOnTeam);
  };

  const queryOptionsMembersNotOnTeam = useMemo(
    () => ({
      _start: pageMembersNotOnTeam * pageSizeMembersNotOnTeam,
      _end:
        pageMembersNotOnTeam * pageSizeMembersNotOnTeam +
        pageSizeMembersNotOnTeam,
      search: formPropsMembersNotOnTeamAddMember.values.search
    }),
    [
      pageMembersNotOnTeam,
      pageSizeMembersNotOnTeam,
      formPropsMembersNotOnTeamAddMember.values.search
    ]
  );

  useEffect(() => {
    dispatch(getAllMemberNotOnTeamAction(teamId, queryOptionsMembersNotOnTeam));
  }, [dispatch, teamId, queryOptionsMembersNotOnTeam, refresh]);

  const { dataMembersNotOnTeam, totalMembersNotOnTeam } = useSelector(
    (state) => {
      return {
        dataMembersNotOnTeam: get(state, 'team.dataMembersNotOnTeam', []),
        totalMembersNotOnTeam: get(state, 'team.totalMembersNotOnTeam', 0)
      };
    }
  );

  const initialValueAddMembers = {
    members: []
  };

  const { handleReset, setValues, values, isValid, dirty } = useFormik({
    initialValues: initialValueAddMembers,
    validationSchema: validatorAddMemberToTeam(translate)
  });

  const initialValueRemoveMembers = {
    members: []
  };

  const { setValues: setValuesRemoveMember, values: valuesRemoveMember } =
    useFormik({
      initialValues: initialValueRemoveMembers,
      validationSchema: validatorAddMemberToTeam(translate)
    });

  const handleSelectionModelChange = (selectionModelAddMembers) => {
    setValues({ members: selectionModelAddMembers });
  };

  const handleSelectionModelChangeRemoveMembers = (
    selectionModelRemoveMembers
  ) => {
    setValuesRemoveMember({ members: selectionModelRemoveMembers });
  };

  const handleConfirm = useCallback(() => {
    dispatch(addMembersToTeamAction(teamId, values));
    setOpenDialog(false);
  }, [dispatch, teamId, values]);

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/users/edit/${id}`);
    },
    [navigate]
  );

  const handleClickAddMember = () => {
    setOpenDialog(true);
  };

  const handleClickRemoveMember = useCallback(() => {
    dispatch(removeMembersFromTeamAction(teamId, valuesRemoveMember));
  }, [dispatch, teamId, valuesRemoveMember]);

  const columns = useMemo(() => {
    return [
      {
        field: 'firstName',
        headerName: translate('resources.users.fields.firstName'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'lastName',
        headerName: translate('resources.users.fields.lastName'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'email',
        headerName: translate('resources.users.fields.email'),
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
  }, [handleEdit, translate, i18n.language]);

  return !records.activated ? (
    <Box>
      <TypoCommon
        variant="body2"
        fontWeight={600}
        label="resources.teams.labels.activate"
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
          placeholder="resources.users.search"
          className={classes.search}
          {...formPropsSearchMemberInTeam}
        />
        {authAllowed({
          whoami,
          permission: menuPermissions.teams.UPDATE
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
                label="resources.teams.labels.addMember"
                onClick={handleClickAddMember}
              />
            </Box>
            <Box width="auto" minWidth={50}>
              <ButtonRegular
                variant="contained"
                label="resources.teams.labels.removeMember"
                onClick={handleClickRemoveMember}
                disabled={valuesRemoveMember.members.length > 0 ? false : true}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Paper elevation={3}>
        <TableGridCommon
          loading={loading}
          rows={dataMembersInTeam}
          rowCount={totalMembersInTeam}
          columns={columns}
          page={pageMembersInTeam}
          pageSize={pageSizeMembersInTeam}
          onPageChange={handleOnPageChangeMembersInTeam}
          onPageSizeChange={handleOnPageSizeChangeMembersInTeam}
          onSelectionModelChange={handleSelectionModelChangeRemoveMembers}
          checkboxSelection
        />
      </Paper>
      <DialogCommon
        open={openDialog}
        setOpen={setOpenDialog}
        title="resources.teams.dialog.title"
        content="resources.teams.dialog.content"
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
                placeholder="resources.users.search"
                className={classes.search}
                {...formPropsMembersNotOnTeamAddMember}
              />
            </Box>
            <TableGridCommon
              loading={loading}
              rows={dataMembersNotOnTeam}
              rowCount={totalMembersNotOnTeam}
              columns={columns}
              page={pageMembersNotOnTeam}
              pageSize={pageSizeMembersNotOnTeam}
              onPageChange={handleOnPageChangeMembersNotOnTeam}
              onPageSizeChange={handleOnPageSizeChangeMembersNotOnTeam}
              onSelectionModelChange={handleSelectionModelChange}
              checkboxSelection
            />
          </Fragment>
        }
      />
    </Box>
  );
};

export default SetUsersInTeamTab;

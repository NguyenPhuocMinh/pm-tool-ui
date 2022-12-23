import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDataConfigJsonAction,
  createNotifyTemplateAction
} from '@reduxStore/actions';
import { useFormik } from 'formik';
import { validatorNotifyTemplateCreate } from '@validators';
import {
  TypoCommon,
  TextInput,
  SwitchInput,
  MarkdownInput,
  SelectInput,
  BoxWrapper,
  ButtonSubmit,
  ButtonCancel
} from '@utilities';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const NotifyTemplateCreate = () => {
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  useEffect(() => {
    dispatch(getDataConfigJsonAction('notify'));
  }, [refresh]);

  const { loading, color, config } = useSelector((state) => {
    return {
      loading: get(state, 'notifyTemplate.loading', false),
      color: get(state, 'common.color', {}),
      config: get(state, 'config.data', {})
    };
  });

  console.log(
    '🚀 ~ file: NotifyTemplateCreate.js:56 ~ const{loading,color,config}=useSelector ~ config',
    config
  );

  // initialValue
  const initialValues = {
    topic: '',
    description: '',
    content: '',
    type: '',
    activated: true
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorNotifyTemplateCreate(translate),
    onSubmit: (values) => handleCreate(values)
  });

  const handleCreate = useCallback(
    (records) => {
      const toolBox = { navigate };
      dispatch(createNotifyTemplateAction(toolBox, records));
    },
    [dispatch]
  );

  const handleCancel = () => {
    navigate('/notify-templates');
  };

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          sx={{
            background: (theme) => color?.hex ?? theme.palette.primary.main
          }}
          subheader={
            <Box display="flex" alignItems="center">
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.notifyTemplates.title.create"
              />
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <BoxWrapper>
            <TextInput
              label="resources.notifyTemplates.fields.topic"
              required
              id="topic"
              source="topic"
              className={classes.input}
              {...formProps}
            />
          </BoxWrapper>
          <BoxWrapper>
            <TextInput
              label="resources.notifyTemplates.fields.description"
              id="description"
              required
              multiline
              rows={4}
              source="description"
              className={classes.input}
              {...formProps}
            />
          </BoxWrapper>
          <BoxWrapper>
            <SelectInput
              label="resources.notifyTemplates.fields.type"
              required
              id="type"
              source="type"
              choices={get(config, 'notify.type.choices')}
              className={classes.input}
              {...formProps}
            />
          </BoxWrapper>
          <BoxWrapper>
            <MarkdownInput
              label="resources.notifyTemplates.fields.content"
              required
              id="content"
              source="content"
              {...formProps}
            />
          </BoxWrapper>
          <BoxWrapper>
            <SwitchInput
              id="activated"
              source="activated"
              label="resources.notifyTemplates.fields.activated"
              {...formProps}
            />
          </BoxWrapper>
        </CardContent>
        <CardActions>
          <ButtonSubmit
            id="pm-tool-button-notify-template-create-submit"
            color={color}
            onClick={handleSubmit}
            loading={loading}
            isValid={isValid}
            dirty={dirty}
          />
          <ButtonCancel
            id="pm-tool-button-notify-template-create-cancel"
            color={color}
            onClick={handleCancel}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default NotifyTemplateCreate;

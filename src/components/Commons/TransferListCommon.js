import { useState } from 'react';
import { useTranslate } from '@hooks';
import {
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider
} from '@mui/material';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const TransferListCommon = ({
  titleLeft = 'common.transferList.titleLeft',
  titleRight = 'common.transferList.titleRight',
  dataLeft = [],
  setDataLeft,
  dataRight = [],
  setDataRight,
  source,
  ...rest
}) => {
  const { setValues } = rest;
  const { translate } = useTranslate();

  const [checked, setChecked] = useState([]);

  const leftChecked = intersection(checked, dataLeft);
  const rightChecked = intersection(checked, dataRight);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleAllRight = () => {
    setDataRight(dataRight.concat(dataLeft));
    setValues({ [source]: dataRight.concat(dataLeft) });
    setDataLeft([]);
  };

  const handleCheckedRight = () => {
    setDataRight(dataRight.concat(leftChecked));
    setValues({ [source]: dataRight.concat(leftChecked) });
    setDataLeft(not(dataLeft, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleAllLeft = () => {
    setDataLeft(dataLeft.concat(dataRight));
    setValues({ [source]: [] });
    setDataRight([]);
  };

  const handleCheckedLeft = () => {
    setDataLeft(dataLeft.concat(rightChecked));
    setValues({ [source]: not(dataRight, rightChecked) });
    setDataRight(not(dataRight, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => {
    return (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1, fontFamily: 'Josefin Sans' }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected'
              }}
            />
          }
          title={translate(title)}
          subheader={translate('common.transferList.subHeader', {
            numberItem: `${numberOfChecked(items)}/${items.length}`
          })}
        />
        <Divider />
        <List
          sx={{
            width: 500,
            height: 230,
            overflow: 'auto'
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((value) => {
            const labelId = `transfer-list-all-item-${value.id}-label`;

            return (
              <ListItem
                key={value.id}
                role="listitem"
                button
                onClick={handleToggle(value)}
                sx={{
                  fontFamily: 'Josefin Sans'
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    fontFamily: 'Josefin Sans'
                  }}
                  id={labelId}
                  primary={value.name}
                />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(titleLeft, dataLeft)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={dataLeft.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={dataRight.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(titleRight, dataRight)}</Grid>
    </Grid>
  );
};

export default TransferListCommon;

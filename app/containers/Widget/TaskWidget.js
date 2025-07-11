import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { PapperBlock } from 'dan-components';
import useStyles from './widget-jss';

function TaskWidget() {
  const [checked, setChecked] = useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { classes, cx } = useStyles();
  return (
    <PapperBlock
      title="My Task"
      icon="ion-ios-checkbox-outline"
      noMargin
      whiteBg
      colorMode
      desc="All Your to do list. Just check it whenever You done."
      className={classes.root}
    >
      <List className={classes.taskList}>
        {[0, 1, 2, 3, 4, 5, 6].map(value => (
          <Fragment key={value}>
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
              className={
                cx(
                  classes.listItem,
                  checked.indexOf(value) !== -1 ? classes.done : ''
                )
              }
            >
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Task item ${value + 1}`} secondary={`Task description ${value + 1}`} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments" size="large">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </PapperBlock>
  );
}

export default TaskWidget;

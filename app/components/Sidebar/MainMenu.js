import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { openAction } from 'dan-redux/modules/ui';
import useStyles from './sidebar-jss';

function MainMenu(props) {
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.subMenuOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleDrawerOpen, dataMenu } = props;

  const handleTransition = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    toggleDrawerOpen();
  };

  const handleOpenMenu = (key, keyParent) => {
    dispatch(openAction({ key, keyParent }));
  };

  const getMenus = (menuArray, paddingLevel = 0) => menuArray.map((item, index) => {
    const key = index.toString();

    // Menú con hijos
    if (item.child || item.linkParent) {
      return (
        <div key={key}>
          <ListItem
            button
            sx={{ marginLeft: !item.icon ? paddingLevel : 0 }}
            className={cx(
              classes.head,
              item.icon ? classes.iconed : '',
              open.indexOf(item.key) > -1 ? classes.opened : '',
            )}
            onClick={() => handleOpenMenu(item.key, item.keyParent)}
          >
            {item.icon && (
              <ListItemIcon className={classes.icon}>
                <i className={item.icon} />
              </ListItemIcon>
            )}
            <ListItemText classes={{ primary: classes.primary }} variant="inset" primary={item.name} />
            {!item.linkParent && (
              <span>
                {open.indexOf(item.key) > -1 ? <ExpandLess /> : <ExpandMore />}
              </span>
            )}
          </ListItem>

          {!item.linkParent && (
            <Collapse
              component="div"
              className={cx(
                classes.nolist,
                item.keyParent ? classes.child : ''
              )}
              in={open.indexOf(item.key) > -1}
              timeout="auto"
              unmountOnExit
            >
              <List className={classes.dense} component="nav">
                {getMenus(item.child, item.level)}
              </List>
            </Collapse>
          )}
        </div>
      );
    }

    // Título
    if (item.title) {
      return (
        <ListSubheader
          disableSticky
          key={key}
          component="div"
          className={classes.title}
        >
          {item.name}
        </ListSubheader>
      );
    }

    // Ítem normal sin hijos
    if (!item.child && item.link !== undefined) {
      const path = item.link || '/app'; // fallback
      return (
        <ListItem
          key={key}
          button
          sx={{ pl: paddingLevel }}
          className={cx(
            classes.nested,
            (path === '/app' && location.pathname !== '/app') ? 'rootPath' : ''
          )}
          onClick={() => handleTransition(path)}
        >
          <Box
            sx={{
              flex: 1,
              pl: paddingLevel,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <ListItemText classes={{ primary: classes.primary }} inset primary={item.name} />
            {item.badge && (
              <Chip color="primary" label={item.badge} className={classes.badge} />
            )}
          </Box>
        </ListItem>
      );
    }

    return null;
  });

  return (
    <div>
      {getMenus(dataMenu)}
    </div>
  );
}

MainMenu.propTypes = {
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired,
};

export default MainMenu;

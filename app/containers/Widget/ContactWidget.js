import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import Chat from '@mui/icons-material/Chat';
import Mail from '@mui/icons-material/Mail';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Check from '@mui/icons-material/CheckCircle';
import AccountBox from '@mui/icons-material/AccountBox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useStyles from './widget-jss';
import obtenerUsuariosPorOptica from '../../api/dummy/services/usuarioService';

/* Tab Container */
function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
/* END Tab Container */

/* Contact List */
function ContactList({ openMenu, usuarios }) {
  const { classes } = useStyles();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return (
    <List>
      {usuarios.map((user) => (
        <ListItem button key={user._id}>
          <Avatar className={classes.avatar}>
            {user.nombre?.[0] || 'U'}
          </Avatar>
          <ListItemText primary={user.nombre} secondary={user.email} />
          {!smDown && (
            <ListItemSecondaryAction>
              <Tooltip title="Chat">
                <IconButton className={classes.blueText} size="large">
                  <Chat />
                </IconButton>
              </Tooltip>
              <Tooltip title="Email">
                <IconButton className={classes.pinkText} size="large">
                  <Mail />
                </IconButton>
              </Tooltip>
              <Tooltip title="Call">
                <IconButton className={classes.tealText} size="large">
                  <PhoneIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          )}
          {!smUp && (
            <ListItemSecondaryAction>
              <IconButton onClick={openMenu} size="large">
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </List>
  );
}

ContactList.propTypes = {
  openMenu: PropTypes.func.isRequired,
  usuarios: PropTypes.array.isRequired,
};

const ContactListStyled = ContactList;
/* END Contact List */

function ContactWidget() {
  const [usuarios, setUsuarios] = useState([]);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAction, setAnchorElAction] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuarioStr = localStorage.getItem('usuario');
      const token = localStorage.getItem('token');
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
      try {
        const lista = await obtenerUsuariosPorOptica(usuario.opticaId, token);
        setUsuarios(lista);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

  const handleChange = (event, val) => {
    setValue(val);
  };

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElAction(null);
  };

  const { classes } = useStyles();
  const open = Boolean(anchorEl);
  const openAct = Boolean(anchorElAction);
  return (
    <Fragment>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Chat className={classes.blueText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Chat" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Mail className={classes.pinkText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Email" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PhoneIcon className={classes.tealText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Call" />
        </MenuItem>
      </Menu>
      <Menu
        id="long-menu-act"
        anchorEl={anchorElAction}
        open={openAct}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Check className={classes.tealText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Fix it" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PlaylistAddCheck />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Skip" />
        </MenuItem>
      </Menu>
      <Paper className={classes.rootContact}>
        <AppBar position="static" color="default">
          {!mdUp && (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab icon={<AccountBox />} />
              <Tab icon={<Chat />} />
              <Tab icon={<NotificationsActive />} />
            </Tabs>
          )}
          {!mdDown && (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Usuarios" icon={<AccountBox />} />
            </Tabs>
          )}
        </AppBar>
        {value === 0 && <TabContainer><ContactListStyled openMenu={handleOpen} usuarios={usuarios}/></TabContainer>}
      </Paper>
    </Fragment>
  );
}

export default ContactWidget;

import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import useStyles from 'dan-components/Forms/user-jss';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ContactWidget from '../../Widget/ContactWidget';
import TaskWidget from '../../Widget/TaskWidget';

function ListaUsuarios() {
  const { classes } = useStyles();
  const title = brand.name + ' - ListaUsuarios';
  const description = brand.desc;

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <Divider className={classes.divider} />
          <ContactWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <Divider className={classes.divider} />
          <TaskWidget />
        </Grid>
      </Grid>
    </div>
  );
}

export default ListaUsuarios;

import React, { useState, useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { PapperBlock } from 'dan-components';
import obtenerRoles from '../../../api/dummy/services/rolService';

const validationSchema = yup.object({
  name: yup.string('Ingrese el nombre').required('Requerido'),
  email: yup.string('Ingrese el email').email('Correo inválido').required('Requerido'),
  password: yup.string('Ingrese la contraseña').min(6, 'Mínimo 6 caracteres').required('Requerido'),
  rol: yup.string().required('Seleccione un rol'),
  sucursal: yup.string().required('Seleccione una sucursal'),
});

const useStyles = makeStyles()((theme) => ({
  form: {
    '& > div': {
      marginBottom: theme.spacing(2)
    }
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 600,
    margin: '40px auto'
  }
}));

function CrearUsuario() {
  const title = brand.name + ' - CrearUsuario Page';
  const description = brand.desc;
  const { classes } = useStyles();
  const [listaRoles, setListaRoles] = useState([]);
  const sucursales = ['Sucursal A', 'Sucursal B', 'Sucursal C'];

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem('token');
      try {
        const roles = await obtenerRoles(token);
        setListaRoles(roles);
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rol: '',
      sucursal: '',
      telefono: '',
      mobile: '',
      direccion: '',
      activo: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Usuario a crear:', values);
      alert(JSON.stringify(values, null, 2));
      // Aquí puedes usar await crearUsuario(values);
    },
  });

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Blank Page" desc="Some text description">
        <Typography variant="h5" gutterBottom>
          Crear Nuevo Usuario
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="standard"
            id="name"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            variant="standard"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            variant="standard"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            variant="standard"
            id="telefono"
            name="telefono"
            label="Teléfono"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            helperText={formik.touched.telefono && formik.errors.telefono}
          />

          <TextField
            fullWidth
            variant="standard"
            id="mobile"
            name="mobile"
            label="Celular"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />

          <TextField
            fullWidth
            variant="standard"
            id="direccion"
            name="direccion"
            label="Dirección"
            value={formik.values.direccion}
            onChange={formik.handleChange}
            error={formik.touched.direccion && Boolean(formik.errors.direccion)}
            helperText={formik.touched.direccion && formik.errors.direccion}
          />

          <FormControl fullWidth>
            <InputLabel variant="standard" id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              id="rol"
              name="rol"
              variant="standard"
              value={formik.values.rol}
              onChange={formik.handleChange}
              error={formik.touched.rol && Boolean(formik.errors.rol)}
            >
              {listaRoles.map((rol) => (
                <MenuItem key={rol._id} value={rol._id}>
                  {rol.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel variant="standard" id="sucursal-label">Sucursal</InputLabel>
            <Select
              labelId="sucursal-label"
              id="sucursal"
              name="sucursal"
              variant="standard"
              value={formik.values.sucursal}
              onChange={formik.handleChange}
              error={formik.touched.sucursal && Boolean(formik.errors.sucursal)}
            >
              {sucursales.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  id="activo"
                  name="activo"
                  checked={formik.values.activo}
                  onChange={formik.handleChange}
                />
              }
              label="Activo"
            />
          </FormGroup>

          <Button color="primary" variant="contained" fullWidth type="submit">
            Crear Usuario
          </Button>
        </form>
      </PapperBlock>
    </div>
  );
}

export default CrearUsuario;

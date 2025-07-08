/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';

export const BlankPage = loadable(() =>
  import('./Pages/BlankPage'), {
    fallback: <Loading />,
  });

export const DashboardPage = loadable(() =>
  import('./Pages/Dashboard'), {
    fallback: <Loading />,
  });

export const NuevaVenta = loadable(() =>
  import('./Pages/Ventas/NuevaVenta'), {
    fallback: <Loading />,
  });

export const Cotizaciones = loadable(() =>
  import('./Pages/Ventas/Cotizaciones'), {
    fallback: <Loading />,
  });

export const Cobranzas = loadable(() =>
  import('./Pages/Ventas/Cobranzas'), {
    fallback: <Loading />,
  });

export const ListaVentas = loadable(() =>
  import('./Pages/Ventas/ListaVentas'), {
    fallback: <Loading />,
  });

export const ListaCobranzas = loadable(() =>
  import('./Pages/Ventas/ListaCobranzas'), {
    fallback: <Loading />,
  });

export const ListaOrdenes = loadable(() =>
  import('./Pages/Ventas/ListaOrdenes'), {
    fallback: <Loading />,
  });

export const Compras = loadable(() =>
  import('./Pages/Compras/Compras'), {
    fallback: <Loading />,
  });

export const Error = loadable(() =>
  import('./Pages/Error'), {
    fallback: <Loading />,
  });

export const Maintenance = loadable(() =>
  import('./Pages/Maintenance'), {
    fallback: <Loading />,
  });

export const ComingSoon = loadable(() =>
  import('./Pages/ComingSoon'), {
    fallback: <Loading />,
  });

export const NotFound = loadable(() =>
  import('./NotFound/NotFound'), {
    fallback: <Loading />,
  });

export const NotFoundDedicated = loadable(() =>
  import('./Pages/Standalone/NotFoundDedicated'), {
    fallback: <Loading />,
  });

export const Form = loadable(() =>
  import('./Pages/Forms/FormikForm'), {
    fallback: <Loading />,
  });

export const Table = loadable(() =>
  import('./Pages/Table/BasicTable'), {
    fallback: <Loading />,
  });

export const Login = loadable(() =>
  import('./Pages/Users/Login'), {
    fallback: <Loading />,
  });

export const Register = loadable(() =>
  import('./Pages/Users/Register'), {
    fallback: <Loading />,
  });

export const ResetPassword = loadable(() =>
  import('./Pages/Users/ResetPassword'), {
    fallback: <Loading />,
  });

export const Parent = loadable(() =>
  import('./Parent'), {
    fallback: <Loading />,
  });

export const ListaUsuarios = loadable(() =>
  import('./Pages/Users/ListaUsuarios'), {
    fallback: <Loading />,
  });

export const CrearUsuario = loadable(() =>
  import('./Pages/Users/CrearUsuario'), {
    fallback: <Loading />,
  });

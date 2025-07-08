import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {
  Parent,
  DashboardPage,
  NuevaVenta,
  Cotizaciones,
  Cobranzas,
  ListaVentas,
  ListaCobranzas,
  ListaOrdenes,
  ListaUsuarios,
  Compras,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="inicio" element={< DashboardPage />} />
        <Route path="nueva-venta" element={< NuevaVenta />} />
        <Route path="cotizaciones" element={<Cotizaciones />} />
        <Route path="cobranzas" element={<Cobranzas />} />
        <Route path="lista-ventas" element={<ListaVentas />} />
        <Route path="lista-cobranzas" element={<ListaCobranzas />} />
        <Route path="lista-ordenes" element={<ListaOrdenes />} />
        <Route path="compras" element={<Compras />} />
        <Route path="usuarios" element={<ListaUsuarios />} />
        <Route path="blank-page" element={<BlankPage />} />
        <Route path="pages" element={<Parent />} />
        <Route path="pages/dashboard" element={<DashboardPage />} />
        <Route path="pages/form" element={<Form />} />
        <Route path="pages/table" element={<Table />} />
        <Route path="pages/not-found" element={<NotFound />} />
        <Route path="pages/error" element={<Error />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;

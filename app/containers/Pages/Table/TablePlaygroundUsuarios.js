import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import EnhancedTableHead from './tableParts/TableHeader';
import EnhancedTableToolbar from './tableParts/TableToolbar';
import useStyles from './tableParts/tableStyle-jss';
import obtenerUsuariosPorOptica from '../../../api/dummy/services/usuarioService';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return {
    id: counter,
    name,
    calories,
    fat,
    carbs,
    protein
  };
}

function TablePlaygroundUsuarios() {
  const [formState, setFormState] = useState({
    order: 'asc',
    orderBy: 'nombre',
    selected: [],
    columnData: [
      {
        id: 'nombre',
        numeric: false,
        disablePadding: false,
        label: 'Nombre'
      },
      {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email'
      },
      {
        id: 'rol',
        numeric: false,
        disablePadding: false,
        label: 'Rol'
      },
      {
        id: 'sucursal',
        numeric: false,
        disablePadding: false,
        label: 'Sucursal'
      },
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Fecha creación'
      },
    ],
    data: [
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Donut', 452, 25.0, 51, 4.9),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
      createData('Honeycomb', 408, 3.2, 87, 6.5),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Jelly Bean', 375, 0.0, 94, 0.0),
      createData('KitKat', 518, 26.0, 65, 7.0),
      createData('Lollipop', 392, 0.2, 98, 0.0),
      createData('Marshmallow', 318, 0, 81, 2.0),
      createData('Nougat', 360, 19.0, 9, 37.0),
      createData('Oreo', 437, 18.0, 63, 4.0),
    ].sort((a, b) => (a.nombre < b.nombre ? -1 : 1)),
    page: 0,
    rowsPerPage: 10,
    defaultPerPage: 10,
    filterText: '',
    size: 'medium',
    bordered: false,
    stripped: true,
    hovered: false,
    toolbar: true,
    checkcell: false,
    pagination: true
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuarioStr = localStorage.getItem('usuario');
      const token = localStorage.getItem('token');
      const user = usuarioStr ? JSON.parse(usuarioStr) : null;
      try {
        const lista = await obtenerUsuariosPorOptica(user.opticaId, token);
        setFormState(prev => ({
          ...prev,
          data: lista
        }));
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleRequestSort = (event, property) => {
    const { orderBy, order, data } = formState;
    const orderByConst = property;
    let orderLet = 'desc';

    if (orderBy === property && order === 'desc') {
      orderLet = 'asc';
    }

    const dataConst = orderLet === 'desc'
      ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
      : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1));

    setFormState({
      ...formState,
      data: dataConst,
      order: orderLet,
      orderBy: orderByConst
    });
  };

  const handleSelectAllClick = event => {
    const { data } = formState;
    if (event.target.checked) {
      setFormState({
        ...formState,
        selected: data.map(n => n.id)
      });
      return;
    }
    setFormState({
      ...formState,
      selected: []
    });
  };

  const handleClick = (event, id) => {
    const { checkcell } = formState;
    if (!checkcell) {
      return;
    }
    const { selected } = formState;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setFormState({
      ...formState,
      selected: newSelected
    });
  };

  const handleChangePage = (event, page) => {
    setFormState({
      ...formState,
      page
    });
  };

  const handleChangeRowsPerPage = event => {
    setFormState({
      ...formState,
      rowsPerPage: event.target.value
    });
  };

  const thisIsSelected = id => formState.selected.indexOf(id) !== -1; // eslint-disable-line

  const handleUserInput = value => {
    // Show all item first
    const { data, defaultPerPage } = formState;
    if (value !== '') {
      setFormState({
        ...formState,
        rowsPerPage: data
      });
    } else {
      setFormState({
        ...formState,
        rowsPerPage: defaultPerPage
      });
    }

    // Show result base on keyword
    setFormState({
      ...formState,
      filterText: value.toLowerCase()
    });
  };
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const {
    data,
    order,
    orderBy,
    selected,
    rowsPerPage,
    page,
    filterText,
    size,
    columnData,
    toolbar, pagination, checkcell,
    bordered, stripped, hovered,
  } = formState;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
  const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => (
    <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{dataArray[itemCell.id]}</TableCell>
  ));
  return (
    <Grid >
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/app/crear-usuario')}
        >
          Crear Usuario
        </Button>
      </div>
      <div>
        <Grid container className={classes.rootTable}>
          <Grid item xs={12}>
            <Paper className={classes.rootTable}>
              {toolbar && (
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  filterText={filterText}
                  onUserInput={(event) => handleUserInput(event)}
                  title="Usuarios del sistema"
                  placeholder="Nombre"
                />
              )}
              <div className={classes.tableWrapper}>
                <Table className={
                  cx(
                    classes.table,
                    hovered && classes.hover,
                    stripped && classes.stripped,
                    bordered && classes.bordered,
                    classes[size])
                }
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={(e) => handleSelectAllClick(e)}
                    onRequestSort={(e, p) => handleRequestSort(e, p)}
                    rowCount={data.length}
                    columnData={columnData}
                    checkcell={checkcell}
                  />
                  <TableBody>
                    {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => {
                      const isSelected = thisIsSelected(n.id);
                      if (!n.nombre || !n.nombre.toLowerCase().includes(filterText)) {
                        return null; // devuelve null para que React ignore el render
                      }
                      return (
                        <TableRow
                          onClick={(event) => handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          {checkcell && (
                            <TableCell padding="checkbox">
                              <Checkbox checked={isSelected} />
                            </TableCell>
                          )}
                          {renderCell(n, columnData)}
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {pagination && (
                <TablePagination
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onPageChange={(e, p) => handleChangePage(e, p)}
                  onRowsPerPageChange={(val) => handleChangeRowsPerPage(val)}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default TablePlaygroundUsuarios;

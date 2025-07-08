import axios from 'axios';

const API_URL = 'http://localhost:3006/api/usuarios';

const obtenerUsuariosPorOptica = async (opticaId, token) => {
  const res = await axios.get(`${API_URL}/optica/${opticaId}`, {
    headers: {
      Authorization: `${token}`
    }
  });
  const listaTransformada = res.data.map(usuario => ({
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rolId?.nombre ?? '',
    sucursal: usuario.sucursalId?.nombre ?? '',
    createdAt: new Date(usuario.createdAt).toLocaleDateString()
  }));
  return listaTransformada;
};

export default obtenerUsuariosPorOptica;

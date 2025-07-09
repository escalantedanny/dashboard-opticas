import axios from 'axios';

const API_URL = 'http://localhost:3006/api/usuarios';

export const ObtenerUsuariosPorOptica = async (opticaId, token) => {
  console.log('API_URL:', `${API_URL}/optica/${opticaId}`);
  const res = await axios.get(`${API_URL}/optica/${opticaId}`, {
    headers: {
      Authorization: `${token}`
    }
  });
  console.log('Usuarios obtenidos:', res.data);
  return res.data.map(usuario => ({
    id: usuario._id,
    nombre: usuario.nombre,
    rut: usuario.rut,
    telefono: usuario.telefono,
    mobile: usuario.mobile,
    direccion: usuario.direccion,
    email: usuario.email,
    rol: usuario.rolId?.nombre ?? '',
    sucursal: usuario.sucursalId?.nombre ?? '',
    createdAt: new Date(usuario.createdAt).toLocaleDateString()
  }));
};

export const CreateUser = async (usuarioData, token) => {
  const res = await axios.post(`${API_URL}/register`, usuarioData, {
    headers: {
      Authorization: `${token}`
    }
  });
  return res.data;
};

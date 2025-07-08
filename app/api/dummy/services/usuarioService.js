import axios from 'axios';

const API_URL = 'http://localhost:3006/api/usuarios';

const obtenerUsuariosPorOptica = async (opticaId, token) => {
  const res = await axios.get(`${API_URL}/optica/${opticaId}`, {
    headers: {
      Authorization: `${token}`
    }
  });
  return res.data;
};

export default obtenerUsuariosPorOptica;

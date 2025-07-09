import axios from 'axios';

const API_URL = 'http://localhost:3006/api/opticas/sucursal';

const obtenerSucursales = async (opticaId, token) => {
  const res = await axios.get(`${API_URL}/${opticaId}`, {
    headers: {
      Authorization: `${token}`
    }
  });
  return res.data;
};

export default obtenerSucursales;

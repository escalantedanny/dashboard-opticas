import axios from 'axios';

const API_URL = 'http://localhost:3006/api/usuarios/roles';

const obtenerRoles = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `${token}`
    }
  });
  return res.data;
};

export default obtenerRoles;

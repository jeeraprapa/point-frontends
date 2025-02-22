import axios from 'axios';
import { API_URL } from '~/utils/constant';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // Ensure cookies are sent

export const useApi = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body: any = null
) => {
  const token = localStorage.getItem('authToken');

  try {
    await axios.get('/sanctum/csrf-cookie');

    const response = await axios({
      url,
      method,
      data: body ? JSON.stringify(body) : null,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
  
};

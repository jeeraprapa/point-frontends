import axios from 'axios';
import { API_URL } from '~/utils/constant';

axios.defaults.withCredentials = true;

export const useApi = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body: any = null
) => {
  const token = localStorage.getItem('authToken');

  const config = useRuntimeConfig();
  axios.defaults.baseURL = config.public.apiBase || API_URL;

  try {
    await axios({
      url: '/sanctum/csrf-cookie',
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })

    const response = await axios({
      url,
      method,
      data: body ?? null,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
  
};

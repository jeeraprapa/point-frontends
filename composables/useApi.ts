import { API_URL } from '~/utils/constant';
import axios from 'axios';
import { get } from '@nuxt/ui/runtime/utils/index.js';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true; // now

export const useApi = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body: any = null
) => {
  const token = localStorage.getItem('authToken');


  try {

    const config = useRuntimeConfig();
    axios.defaults.baseURL = config.public.apiBase || API_URL;

    const sanctum = await axios({
      url: '/sanctum/csrf-cookie',
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }).then((res) => res.data);
    
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    //get cookie
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=').map(c => c.trim());
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
    const cookie = get(cookies, 'XSRF-TOKEN');

    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      accept: "application/json",
      withCredentials: true,
      "X-XSRF-TOKEN": cookie
    };


    const response = await axios({
      url,
      method,
      data: body ?? null,
      headers: headers,
    });


    return response.data;
  } catch (error) {
    throw error;
  }
  
};

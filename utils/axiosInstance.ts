import axios from 'axios';
import { API_URL } from '~/utils/constant';

const $axios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent
});

export default $axios;

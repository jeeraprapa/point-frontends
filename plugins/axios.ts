import axios from 'axios'

import { API_URL } from '~/utils/constant';

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true; // now
  axios.defaults.baseURL = API_URL;
  nuxtApp.axios = axios;
});
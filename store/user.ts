import {defineStore} from 'pinia';
import Swal from 'sweetalert2';
import { API_URL } from '~/utils/constant';
import { useApi } from '#imports';

export const useUserStore = defineStore("user",{
  state: () => ({
    user: {
      name: "",
      email: "",
      point: 0,
    },
    authToken: "",
    isAuth: false,
  }),
  getters: {
    isLoggedIn: (state) => !!state.isAuth,
  },
  actions: {
    reset(){
      this.user = {
        name: "",
        email: "",
        point: 0,
      };
      this.authToken = "";
      this.isAuth = false;
    },
    async signup(name: string, email: string, password: string) {
      // Call your API here
      const response = await useApi("/api/register", "POST", {
        name,
        email,
        password,
      });

     return response;
    },
    async login(email: string, password: string) {
      // Call your API here
      const data = await useApi("/api/auth/login", "POST", {
        email,
        password,
      });

      

      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid email or password',
        });
      }else{
        this.user = data.user;
        this.authToken = data.token;
        this.isAuth = true;
        // Save the token in local storage
        localStorage.setItem("authToken", data.token);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Logged in successfully',
          timer: 2000,
          showConfirmButton: false,
        }).finally(() => {
          navigateTo("/");
        });
      }
    },
    logout() {
      this.user = {
        name: "",
        email: "",
        point: 0,
      };
      this.authToken = "";
      this.isAuth = false;

      // Remove token from local storage
      localStorage.removeItem("authToken");


    },
    async checkAuth() {
      if (process.client) {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await useApi("/api/auth/check-auth", "GET");
          const data = await response;
          if (data.success === false) {
          
            localStorage.removeItem("authToken");
            this.user = {
              name: "",
              email: "",
              point: 0,
            };
            this.authToken = "";
            this.isAuth = false;

            navigateTo("/login");
          } else {
            this.user = data.user;
            this.authToken = token;
            this.isAuth = true;
          }
        }
      }
    },
    async getUserHistory() {
      const data = await useApi("/api/redeem-history", "GET");
      
      await this.checkAuth();
      return data;
    },
    async sanctum(){
      await useApi("/sanctum/csrf-cookie", "GET");
    }
  },
  persist: true,
});

import {defineStore} from 'pinia';
import Swal from 'sweetalert2';
import { hydrate } from 'vue';
import { API_URL } from '~/utils/constant';

export const useUserStore = defineStore("user",{
  state: () => ({
    user: {
      name: "",
      email: "",
      role: "",
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
        role: "",
      };
      this.authToken = "";
      this.isAuth = false;
    },
    async signup(name: string, email: string, password: string) {
      // Call your API here
      const response = await fetch(`${API_URL}/api/register`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
     return data;
    },
    async login(email: string, password: string) {
      // Call your API here
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.errors) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid email or password',
        });
      }else{
        this.user = data.user;
        this.authToken = data.access_token;
        this.isAuth = true;
        // Save the token in local storage
        localStorage.setItem("authToken", data.access_token);
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
        role: "",
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
          const response = await fetch(`${API_URL}/api/auth/check-auth`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          if (data.statusCode) {
            alert(data.message);
          
            localStorage.removeItem("authToken");
            this.user = {
              name: "",
              email: "",
              role: "",
            };
            this.authToken = "";
            this.isAuth = false;

            navigateTo("/login");
          }
          
          if(data.user !== null) {
            this.user = data.user;
            this.authToken = token;
            this.isAuth = true;
          }
        }
      }
    },
    async getUserHistory() {
      // Call your API here \api\auth\rents
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/auth/rents`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if(data.statusCode){
        alert(data.message);

        //redirect to login
        navigateTo("/login");
      }

      return data;
    },
    async getUserHistoryNotReturn() {
      // Call your API here \api\auth\rents
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/auth/rents?isReturned=false`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.json();
      return data;
    },
    async returnBooks(bookIds: number[]) {
      console.log("Book ids", bookIds);
      // Call your API here
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/auth/rents/return`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookIds }),
      });

      const data = await response.json();
      if (data.statusCode) {
        alert(data.error);
      }else{
        alert("Books returned successfully");
      }
    }
    
  },
  persist: true,
});
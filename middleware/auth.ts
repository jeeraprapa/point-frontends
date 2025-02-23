import { useUserStore } from "@/store/user";

export default defineNuxtRouteMiddleware(to =>{
  const authStore = useUserStore();
  authStore.checkAuth();
  const { user,isAuth } = storeToRefs(authStore);

  if (!isAuth) {
    alert("You need to login first");
    authStore.logout();
    navigateTo("/login");
  }

});
import { useUserStore } from "@/store/user";

export default defineNuxtRouteMiddleware(to =>{
  const authStore = useUserStore();
  authStore.checkAuth();
  const { user } = storeToRefs(authStore);

  if (!user) {
    authStore.logout();
    return '/';
  }

  if (to.meta.requiresAdmin && user.value.role !== "admin") {
    return navigateTo("/unauthorized");
  }

  // 🔥 ตรวจสอบเฉพาะเส้นทาง /admin/*
  if (to.path.startsWith("/admin") && user.value.role !== "admin") {
    return navigateTo("/unauthorized"); // ไปหน้าห้ามเข้า
  }
});
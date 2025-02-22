import { defineStore } from "pinia";
import { ref } from 'vue'

interface CartItem {
  id: number;
  title: string;
}

export const useCartStore = defineStore("cartStore",{
  state: () => ({
    items: ref<CartItem[]>([]),
  }),
  getters: {
    totalItems(): number {
      return this.items.length;
    },
  },
  actions: {
    addItem(item: any) {
      // Check if the item is already in the cart
      const existingItem = this.items.find((i) => i.id === item.id);
      if (existingItem) {
        return;
      }

      item.quantity = 1;
      this.items.push(item);
      
    },
    removeItem(index: number) {
      this.items.splice(index, 1);
    },
    clearCart() {
      this.items = [];
    },
    async checkout() {
      // Call your API here
      const token = localStorage.getItem("authToken");
      const bookIds = this.items.map((item) => item.id);

      if(!token){
        alert("You need to login to rent books");
        navigateTo("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/api/auth/rents", {
        method: "POST",
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
        alert("Books rented successfully");
        this.clearCart();
      }
    }
  },
  persist: true
});
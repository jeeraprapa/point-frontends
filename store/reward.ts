import { defineStore } from "pinia";
import { ref } from 'vue'
import { API_URL } from '~/utils/constant';

interface Reward {
  id: number;
  title: string;
  description: string;
  image: string;
  points: number;
  start_date: string;
  expiry_date: string;
  is_redeemable: boolean; 
}

export const useRewardStore = defineStore("rewardStore",{
  state: () => ({
    books: ref<Reward[]>([]),
  }),
  getters: {
    totalBooks(): number {
      return this.books.length;
    },
  },
  actions: {
    async getRewards() {``
      // Call your API here
      const response = await fetch(`${API_URL}/api/rewards/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      this.books = data.books;

    },
    async getRewardById(id: number) {
      // Call your API here
      const response = await useApi(`/api/rewards/${id}`, "GET");

      return response;
    },
    async redeemReward(id: number) {
      // Call your API here
      // const response = await useApi(`/api/rewards/${id}/redeem`, "POST");

      // return response;
    },
  },
  persist: true
});
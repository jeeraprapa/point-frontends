import { defineStore } from "pinia";
import { ref } from 'vue'
import { useApi } from "#imports";

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
    rewards: ref<Reward[]>([]),
  }),
  getters: {
    totalReward(): number {
      return this.rewards.length;
    },
  },
  actions: {
    async getRewards() {``
      // Call your API here
      const response = await useApi("/api/rewards/list", "GET");

      const data = await response.json();
      this.rewards = data.rewards;

    },
    async getRewardById(id: number) {
      // Call your API here
      const response = await useApi(`/api/rewards/${id}`, "GET");

      return response;
    },
    async redeemReward(id: number) {

      // Call your API here
      const response = await useApi('/api/rewards/redeem', "POST",{
        reward_id: id
      });

      return response;
    },
  },
  persist: true
});
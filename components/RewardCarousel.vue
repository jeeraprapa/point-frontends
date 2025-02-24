<script setup lang="ts">
interface RewardList {
  success: boolean;
  rewards: {
    data: Reward[];
  }
}
interface Reward {
  id: number;
  title: string;
  description: string;
  image: string;
  points: number;
  start_date: string;
  expiry_date: string;
}

const rewards = ref<Reward[]>([]);

const data = await useApi(`/api/rewards/list`);
rewards.value = data.rewards.data || [];

</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center py-10">
      รายการสิทธิพิเศษ
    </h1>
  </div>
  <UCarousel v-slot="{ item }" dots :items="rewards" :ui="{ item: 'basis-1/3' }">
    <AppLink :key="item.id" :href="`/reward/${item.id}`">
      <img :src="item.image" width="320" height="320" class="rounded-lg">
    </AppLink>
  </UCarousel>
</template>


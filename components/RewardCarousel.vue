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

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center py-10">
      รายการสิทธิพิเศษ
    </h1>
  </div>
  <UCarousel v-slot="{ item }" dots :items="rewards" :ui="{ item: 'basis-1/3' }">
    <AppLink :key="item.id" :to="`/reward/${item.id}`">
      <img :src="item.image" width="320" height="320" class="rounded-lg">
    </AppLink>
  </UCarousel>
</template>


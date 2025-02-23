
<script setup lang="ts">
import { ref, onMounted,onUnmounted   } from 'vue';
import { CalendarIcon } from '@heroicons/vue/24/outline';
import { API_URL } from '~/utils/constant';
import { RewardList } from '#components';
import { formatShortDate } from "~/utils/helper";
import { useUserStore } from '~/store/user';
import { useApi } from "#imports";


const addrewardToCart = (reward: Reward) => {
  
};

useHead({
      title: 'Reward',
      meta: [
          { name: 'description', content: 'All Reward' }
      ]
  })

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
const meta = ref({
  totalItems: 0,
  itemsPerPage: 10,
  totalPages: 1,
  currentPage: 1,
});

const currentPage = ref(1);
const loading = ref(false);
const error = ref<string | null>(null);

interface RewardList {
  success: boolean;
  rewards: {
    data: Reward[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  }
}

const fecthReward = async () => {
  loading.value = true;
  error.value = null;

  try {

    const data = await useApi(`/api/rewards/list?page=${currentPage.value}`);

    rewards.value = data.rewards.data || [];

    let paginate = {
      totalItems: data.rewards.total,
      itemsPerPage: data.rewards.per_page,
      totalPages: data.rewards.last_page,
      currentPage: data.rewards.current_page,
    };

    meta.value = paginate || {};
  } catch (err) {
    error.value = 'Failed to load rewards';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Update page and fetch data
const updatePage = (newPage: number) => {
  if (newPage !== currentPage.value) {
    currentPage.value = newPage;
    fecthReward();
  }
};

onMounted(async () => {
  await fecthReward();
});

onUnmounted(() => {
  
  rewards.value = [];
  meta.value = {
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  };
  error.value = null;
  loading.value = false;
});
definePageMeta({
  ssr: false
})
</script>

<template>
  <div>
    <AppContainer>
      <p v-if="loading">Loading...</p>
      <p v-if="error" class="error">{{ error }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-if="rewards.length" v-for="reward in rewards" :key="reward.id" class="bg-white shadow-md rounded-lg flex flex-wrap align-content-stretch">
          <a :href="`/reward/${reward.id}`" class="relative w-full h-105">
            <div class="absolute top-0 right-0 p-2 bg-green-500 text-white rounded-bl-lg rounded-tr-lg">
              <p>

                {{ reward.points }} คะแนน
              </p>
            </div>

            <img :src="reward.image" alt="reward.title" class="w-full h-64 object-cover rounded-t-lg">
            <div class="p-4">
              <h2 class="text-xl font-bold text-gray-800">{{ reward.title }}</h2>
              <p class="text-gray-600">{{ reward.description }}</p>
              <div class="flex justify-between mt-4">
                <CalendarIcon class="w-6 h-6 text-green-500" />
                <p class="text-gray-600">{{ formatShortDate(reward.start_date) }} - {{ formatShortDate(reward.expiry_date) }}</p>
              </div>
            </div>
          </a>
          <div class="p-4 flex justify-center align-items-end">
            <UButton :to="`/reward/${reward.id}`" size="sm" color="secondary" class="bg-green-500 dark:text-white text-xl px-4 rounded-full" @click="addrewardToCart(reward)">
              รายละเอียด
            </UButton>
          </div>
        </div>
      </div>
    </AppContainer>
    <UPagination
      :class="['flex justify-center mt-4']"
      v-if="meta.totalPages > 1"
      v-model="currentPage"
      :total="meta.totalItems"
      :page-count="meta.itemsPerPage"
      :items-per-page="meta.itemsPerPage"
      :to="page => `?page=${page}`"
      @page-change="updatePage($event)"
      >
        <template #prev>
          <UButton
            @click="updatePage(currentPage - 1)"
          >
            <Icon name="heroicons-solid:chevron-left" />
          </UButton>
        </template>
        <template #next>
          <UButton
            @click="updatePage(currentPage + 1)" >
            <Icon name="heroicons-solid:chevron-right" />
          </UButton>
        </template>
        <template #item="{ item }">
          <UButton @click="updatePage(item.value)" :class="currentPage === item.value ? 'dark:text-white' : ''">
            {{ item.value }}
          </UButton>
        </template>
        <template #ellipsis>
          <span>...</span>
        </template>

        <template #first>
          <UButton @click="updatePage(1)">
            <Icon name="heroicons-solid:chevron-double-left" />
          </UButton>
        </template>
        <template #last>
          <UButton @click="updatePage(meta.totalPages)">
            <Icon name="heroicons-solid:chevron-double-right" />
          </UButton>
        </template>
    </UPagination>

  </div>
</template>


<style scoped>

</style>
<script setup lang="ts">
//fecth reward detail
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRewardStore } from '~/store/reward';
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';
import { formatShortDate } from '~/utils/helper';
import { useUserStore } from '~/store/user';
import Swal from 'sweetalert2';

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

interface Response {
  success: boolean;
  reward: Reward;
}

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const id = ref(0);
const rewardStore = useRewardStore();
const reward = ref({}) as Ref<Reward>;

onMounted(() => {
  const route = useRoute();
  id.value = Number(route.params.id);
  (rewardStore.getRewardById(id.value) as Promise<Response>).then((data: Response) => {
    reward.value = data.reward;
    items.value = [
      {
        label: 'Home',
        icon: 'i-lucide-house',
        to: '/',
      },
      {
        label: 'Reward',
        icon: 'i-lucide-gift',
        to: '/reward',
      },
      {
        label: reward.value.title,
      },
  ];
  });
});

const redeem = async (reward: Reward) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to redeem this reward?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      redeemReward(reward);
    }
  });
};

async function redeemReward(reward: Reward) {
  const response = await rewardStore.redeemReward(reward.id);
  if(response.success) {
    Swal.fire({
      title: 'Success',
      text: 'You have successfully redeemed the reward',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    navigateTo('/profile');
  }else{
    Swal.fire({
      title: 'Error',
      text: 'You do not have enough points to redeem this reward',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}

const items = ref([])
</script>

<template>

  <div class="flex justify-start">
    <UBreadcrumb :items="items" />
  </div>
  <h1 class="text-3xl font-bold text-center py-10">
    {{ reward.title }}
  </h1>
  <div v-if="reward">
    <div class="flex">
      <div class="w-1/2 p-4">
        <img :src="reward.image" alt="reward.title" class="w-full h-120 object-contain lazyload" />
      </div>
      <div class="w-1/2">
        <p class="mb-2 text-xl">{{ reward.title }}</p>
        <p class="mb-2 text-sm">{{ reward.description }}</p>

        <p class="mb-2 text-md flex items-center">
          <CalendarIcon class="w-6 h-6 text-green-500 pr-2" />
          {{ formatShortDate(reward.start_date) }} - {{ formatShortDate(reward.expiry_date) }}
        </p>
        <div class="mt-4 text-white flex text-md w-50 border-1 bg-transparent border-white rounded-md p-2">
          <CurrencyDollarIcon class="w-5 h-5 text-white pr-1" />
          ใช้คะแนน
          {{ reward.points }} Points
        </div>
        <div class="row mt-4">
          <div class="col-12">
            <h2 class="text-xl font-bold mb-2">เงื่อนไขการรับสิทธิ์</h2>
            <p class="text-md">
              (การแลก 1 รายการต่อ 1 สิทธิ์)
            </p>
          </div>
          <div class="col-12">
            <UButton class="mt-4 text-xl text-white px-5 py-2"  @click="redeem(reward)" 
            :disabled="!reward.is_redeemable || reward.points > user.point">
              แลกรับสิทธิ์
            </UButton>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped></style>
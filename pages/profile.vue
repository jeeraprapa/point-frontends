<script setup lang="ts">
import { useUserStore } from '~/store/user';
import { formatDate, formatShortDate, timeFromNow } from "~/utils/helper";
import { onUnmounted } from 'vue';
import {CurrencyDollarIcon} from '@heroicons/vue/24/outline';

const userStore = useUserStore();
const { user,isAuth } = storeToRefs(userStore);

interface History {
  id: number;
  redeemed_at: Date;
  status: string;
  reward: {
    id: number;
    title: string;
    points: number,
    image: string;
    start_date: Date,
    expiry_date: Date,
    is_active: boolean
  };
}

interface Resonse {
  status: boolean,
  user_rewards: History[];
}

//get history data
const history = ref([]) as Ref<History[]>;

onMounted(async () => {
  if(!isAuth.value){
    navigateTo('/login');
  }

  const response = await userStore.getUserHistory();

  if (response.success) {
    history.value = response.user_rewards;
  }
});

definePageMeta({
  middleware: 'auth'
})

onUnmounted(() => {
  history.value = [];
});
</script>

<template>
  <div>
    <AppContainer>
      <h1 class="text-3xl font-bold text-center py-10">
        ยินดีต้อนรับคุณ {{ user?.name }}
      </h1>
      <div class="flex items-center justify-center">

        <p class="rounded-lg bg-gray-500 p-4 text-center">
         คุณมีคะแนนสะสมทั้งหมด 
         <CurrencyDollarIcon class="w-6 h-6 inline-block text-yellow-200" />
         <span class="text-green-500">{{ user?.point }} </span>
         คะแนน
        </p>

      </div>

      <!-- history -->
      <div class="mt-10">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold my-4">
          ประวัติการแลกรับสิทธิ์
          </h2>
        </div>
        <div class="w-full mx-auto border rounded-lg overflow-hidden shadow-lg">
          <!-- หัวตาราง -->
          <div class="bg-gray-800 text-white flex">
            <div class="w-1/8 p-2 text-center">
              #
            </div>
            <div class="w-2/8 p-2 text-center">
              รายการ
            </div>
            <div class="w-2/8 p-2 text-center">
              วันที่แลกรับสิทธิ์
            </div>
            <div class="w-2/8 p-2 text-center">
              คะแนน
            </div>
            <div class="w-1/8 p-2 text-center">
              สถานะ
            </div>
          </div>

          <!-- รายการตาราง -->
          <div class="flex flex-col">
            <div v-for="(item, index) in history" :key="item.id" class="flex p-2 text-center dark:text-gray-600"
              :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'">
              <div class="w-1/8">{{ item.id }}</div>
              <div class="w-2/8">{{ item.reward.title }}</div>
              <div class="w-2/8">{{ item.redeemed_at ? formatDate(item.redeemed_at) : "" }}</div>
              <div class="w-2/8">{{ item.reward.points }}</div>
              <div class="w-1/8">
                {{ item.status }}
              </div>
            </div>
            <div>
              <p v-if="history.length === 0" class="text-center p-4">ไม่มีข้อมูล</p>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </div>
</template>

<style scoped>

</style>
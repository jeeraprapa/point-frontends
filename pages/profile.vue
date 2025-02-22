<script setup lang="ts">
import { AppLink } from '#components';
import { useUserStore } from '~/store/user';
import { formatDate, formatShortDate, timeFromNow } from "~/utils/helper";
import { onUnmounted } from 'vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

interface History {
  id: number;
  rentDate: Date;
  returnDate: Date;
  returnedAt: Date;
  isReturned: boolean;
  isLate: boolean;
  book: {
    title: string;
  };
}

//get history rent data
const history = ref([]) as Ref<History[]>;

onMounted(async () => {
  history.value = await userStore.getUserHistory();
});

definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

onUnmounted(() => {
  history.value = [];
  userStore.reset();
});
</script>

<template>
  <div>
    <AppContainer>
      <h1 class="text-3xl font-bold text-center py-10">
        Profile
      </h1>
      <div class="flex items-center justify-center">

        <p>
          Welcome, {{ user?.name }}
        </p>

      </div>

      <!-- history -->
      <div class="mt-10">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold my-4">
          ประวัติการยืม-คืน
          </h2>
          <AppLink href="/return-book" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            คืนหนังสือ
          </AppLink>
        </div>
        <div class="w-full mx-auto border rounded-lg overflow-hidden shadow-lg">
          <!-- หัวตาราง -->
          <div class="bg-gray-800 text-white flex">
            <div class="w-1/10 p-2 text-center">
              #
            </div>
            <div class="w-2/10 p-2 text-center">
              Book
            </div>
            <div class="w-2/10 p-2 text-center">
              วันที่ยืม
            </div>
            <div class="w-2/10 p-2 text-center">
              กำหนดคืน
            </div>
            <div class="w-2/10 p-2 text-center">
              วันที่คืน
            </div>
            <div class="w-1/10 p-2 text-center">
              สถานะ
            </div>
          </div>

          <!-- รายการตาราง -->
          <div class="flex flex-col">
            <div v-for="(item, index) in history" :key="item.id" class="flex p-2 text-center dark:text-gray-600"
              :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'">
              <div class="w-1/10">{{ item.id }}</div>
              <div class="w-2/10">{{ item.book.title }}</div>
              <div class="w-2/10">{{ item.rentDate ? formatShortDate(item.rentDate) : "" }}</div>
              <div class="w-2/10">{{ item.returnDate  ? formatShortDate(item.returnDate) : "" }}</div>
              <div class="w-2/10">{{ item.returnedAt ? formatShortDate(item.returnedAt) : "" }}</div>
              <div class="w-1/10">
                <span v-if="item.isLate" class="text-red-500">เกินกำหนด</span>
                <span v-else-if="item.isReturned" class="text-green-500">คืนแล้ว</span>
                <span v-else class="text-yellow-500">ยังไม่คืน</span>
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
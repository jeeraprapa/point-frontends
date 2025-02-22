<script setup lang="ts">
  import { useUserStore } from '~/store/user';
  import { formatDate, formatShortDate, isBeforeDate } from "~/utils/helper";

  const userStore = useUserStore();
  const { user } = userStore;

  interface History {
  id: number;
  rentDate: Date;
  returnDate: Date;
  returnedAt: Date;
  isReturned: boolean;
  isLate: boolean;
  book: {
    id: number;
    title: string;
  };
}

onMounted(async () => {
  history.value = await userStore.getUserHistoryNotReturn();
});

//get history rent data
const history = ref([]) as Ref<History[]>;
const selectedBooks = ref<number[]>([]);
const now = ref(new Date());

const returnBooks = async () => {
  console.log(selectedBooks.value);
  await userStore.returnBooks(selectedBooks.value);
  history.value = await userStore.getUserHistoryNotReturn();
  selectedBooks.value = [];
}

  definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script>

<template>
  <div>
    <AppContainer>
      <h1 class="text-3xl font-bold text-center py-10">
        รายการยืม
      </h1>
      <div class="w-full mx-auto border rounded-lg overflow-hidden shadow-lg">
          <!-- หัวตาราง -->
          <div class="bg-gray-800 text-white flex">
            <div class="w-1/8 p-2 text-center">
              เลือก
            </div>
            <div class="w-2/8 p-2 text-center">
              Book
            </div>
            <div class="w-2/8 p-2 text-center">
              วันที่ยืม
            </div>
            <div class="w-2/8 p-2 text-center">
              กำหนดคืน
            </div>
            <div class="w-1/8 p-2 text-center">
              สถานะ
            </div>
          </div>

          <!-- รายการตาราง -->
          <div class="flex flex-col">
            <div v-for="(item, index) in history" :key="item.id" class="flex p-2 text-center dark:text-gray-600"
              :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'">
              <div class="w-1/8">
                <input type="checkbox" v-model="selectedBooks" :value="item.book.id" />
              </div>
              <div class="w-2/8">{{ item.book.title }}</div>
              <div class="w-2/8">{{ item.rentDate ? formatShortDate(item.rentDate) : "" }}</div>
              <div class="w-2/8">{{ item.returnDate  ? formatShortDate(item.returnDate) : "" }}</div>
              <div class="w-1/8">
                <span v-if="isBeforeDate(item.returnDate,now)" class="text-red-500">เกินกำหนด</span>
                <span v-else class="text-yellow-500">
                  อยู่ระหว่างกำหนด
                </span>
              </div>
            </div>
            <div v-if="history.length === 0" class="p-2 text-center dark:text-gray-600 bg-gray-200">
              ไม่มีข้อมูล
            </div>
          </div>
          <div class="flex justify-end p-2" v-if="history.length > 0">
            <InputButton 
            @click="returnBooks"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            :disabled="selectedBooks.length === 0"
            >
              คืนหนังสือ
            </InputButton>
          </div>
      </div>
    </AppContainer>
  </div>
</template>

<style scoped>

</style>
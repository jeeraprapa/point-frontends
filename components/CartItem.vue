<script setup lang="ts">
import { useCartStore } from "@/store/cart";
import { TrashIcon } from '@heroicons/vue/24/outline';

//props
const props = defineProps<{
  idx: number;
  item: {
    id: number;
    title: string;
  };
}>();

const cartStore = useCartStore();

</script>

<template>
  <div class="grid-rows p-4 border border-gray-200">
    <div class="flex justify-between items-center">
      <p class="text-lg font-bold">{{ item.title }}</p>
      <div class="flex items-center">
        <button @click="cartStore.removeItem(idx)" class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
          <TrashIcon class="w-6 h-6"></TrashIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
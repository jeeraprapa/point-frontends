<script setup lang="ts">
import { useCartStore } from '~/store/cart';
const cartStore = useCartStore();
</script>

<template>
  <div>
    <AppContainer>
      <h1 class="text-3xl font-bold text-center py-10">
        Cart
      </h1>
      <div v-if="cartStore.items.length === 0" class="text-center">
        <p class="text-xl">No items in cart</p>
      </div>
      <div v-else>
        <div class="grid gap-4">
          <CartItem v-for="item,key in cartStore.items" :key="item.id" :idx="key" :item="item"></CartItem>
        </div>
        <div class="text-right mt-4">
          <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" @click="cartStore.clearCart()">
            Clear Cart
          </button>
          <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="cartStore.checkout()">
            Checkout
          </button>
        </div>
      </div>
    </AppContainer>
  </div>
</template>


<style scoped>

</style>
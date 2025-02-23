<script setup lang="ts">
const items = [
  {
    label: 'Hone',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Reward',
    icon: 'i-lucide-gift',
    to:'/reward'
  },
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    to: '/profile'
  }
]
</script>

<template>
  <div class="fixed bottom-0 w-full">
    <UNavigationMenu 
    color="primary"
    :items="items" 
    class="w-full justify-center bg-white dark:bg-gray-800">
    </UNavigationMenu>
  </div>
</template>


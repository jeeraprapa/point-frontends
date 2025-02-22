<template>
  <div>
    <AppContainer>
      <div class="flex flex-col items-center justify-center h-screen">
        <div class="bg-gray-300 p-8 rounded-lg shadow-md text-center">
          <h1 class="text-3xl font-bold text-red-600">🚫 Access Denied</h1>
          <p class="text-gray-600 mt-2">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
          <NuxtLink to="/" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            กลับหน้าแรก
          </NuxtLink>
        </div>
      </div>
    </AppContainer>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
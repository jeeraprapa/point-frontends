<template>
  <KeepAlive>
    <AppNavbar></AppNavbar>
  </KeepAlive>
  
  <div class="container mx-auto">
    <slot></slot>
  </div>

  <AppNavigation></AppNavigation>
</template>


<style scoped>

</style>
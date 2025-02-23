<template>

  <AppNavbar></AppNavbar>
  <client-only>
    <div class="container mx-auto pb-25">
      <slot></slot>
    </div>
  </client-only>
</template>


<style scoped></style>
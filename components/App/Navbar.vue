<script setup>
import { AppLink } from '#components';
import { useUserStore } from '@/store/user';
import { ShoppingCartIcon,UserIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';
import Swal from 'sweetalert2';

const menuitems = [
  { title: 'Home', path: '/' },
  { title: 'Rewards', path: '/reward' },
];

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const open = ref(false);

const logout = async () => {
  userStore.logout();
  Swal.fire({
    icon: 'success',
    title: 'Logged out successfully',
    showConfirmButton: false,
    timer: 3000
  }).finally(() => {
    navigateTo('/');
  });
};

onMounted(() => {
  userStore.checkAuth();
});

</script>

<template>
  <AppContainer>
    <header class="flex flex-col lg:flex-row justify-between items-center my-5">
      <div class="flex w-full lg:w-auto items-center justify-between">
        <AppLink href="/">
          <span class="font-bold text-slate-800 dark:text-white">Point</span
          ><span class="text-slate-500 dark:text-green-500">
            Reward
          </span>
        </AppLink>

        <div class="block lg:hidden">
          <button @click="open = !open" class="text-gray-800 dark:text-white">
            <svg
              fill="currentColor"
              class="w-4 h-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path
                v-show="open"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
              ></path>
              <path
                v-show="!open"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <nav
        class="w-full lg:w-auto mt-2 lg:flex lg:mt-0"
        :class="{ block: open, hidden: !open }"
      >
        <ul class="flex flex-col lg:flex-row lg:gap-3">
          <li v-for="item of menuitems">
            <AppLink :href="item.path" size="md" block class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white">
              {{ item.title }}
            </AppLink>
          </li>
        </ul>
        <div class="lg:hidden flex items-center mt-3 gap-4">
          <AppLink href="/login" styleName="muted" block size="md"
          v-if="!userStore.isAuth">
            Log in
          </AppLink>
          <AppLink href="/signup" size="md" block v-if="!userStore.isAuth">
            Sign up
          </AppLink>
          <AppLink href="/profile" size="md" block v-if="userStore.isAuth">
            <UserIcon class="w-6 h-6 dark:text-white" />
          </AppLink>
          <AppLink href="#"  @click="logout" size="md" block v-if="userStore.isAuth">
            Log out
          </AppLink>
        </div>
      </nav>
      <div>
        <div class="hidden lg:flex items-center gap-4">
          <a href="/login" v-if="!userStore.isAuth">
            Log in
          </a>
          <AppLink href="/signup" size="md" v-if="!userStore.isAuth">
            Sign up
          </AppLink>
          <AppLink href="/profile" size="md" block v-if="userStore.isAuth">
            <UserIcon class="w-6 h-6 dark:text-white inline mr-2" /> 
            <div class="inline rounded-full py-2 px-4 bg-gray-200 dark:bg-gray-800">
              <CurrencyDollarIcon class="w-4 h-4 dark:text-yellow-200 inline mr-1" />
            <span class="text-green-500">{{ user?.point }}</span> 
            </div>
          </AppLink>
          <AppLink href="#" @click="logout" size="md" block v-if="userStore.isAuth">
            Log out
          </AppLink>
        </div>
      </div>
    </header>
  </AppContainer>
</template>
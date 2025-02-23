<template>
  <div class="flex items-center justify-center ">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <form class="mt-6" @submit.prevent="submitForm">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="email" type="text" v-model="email"></Field>
            <ErrorMessage name="email" />
        </div>
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="password" type="password" v-model="password"></Field>
            <ErrorMessage name="password" />
        </div>
        <InputButton size="lg" styleName="primary" block class="mt-6" type="submit">Log in</InputButton>
        <a href="/signup">
          <InputButton size="lg" styleName="outline" block class="mt-4" type="button">Sign up</InputButton>
        </a>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import * as yup from 'yup'
import { Field } from 'vee-validate';

const userStore = useUserStore();

const { user } = storeToRefs(userStore);


const email = ref('');
const password = ref('');

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const { handleSubmit } = useForm({ validationSchema });

const submitForm = handleSubmit(async () => {
  await userStore.login(email.value, password.value);
  
})

onMounted(() => {
  if(userStore.isAuth) {
    navigateTo('/profile');
  }
})
</script>

<style scoped>

</style>
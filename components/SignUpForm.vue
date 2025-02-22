<template>
  <div class="flex items-center justify-center ">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <form class="mt-6" @submit.prevent="submitForm">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="name" type="text" v-model="name"></Field>
            <ErrorMessage name="name" />
        </div>
        <div class="mt-4">
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
        <InputButton size="lg" styleName="primary" block class="mt-6" type="submit">Sign up</InputButton>
        <a href="/login">
          <InputButton size="lg" styleName="outline" block class="mt-4" type="button">Log In</InputButton>
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
import Swal from 'sweetalert2';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const userStore = useUserStore();
const { handleSubmit } = useForm({ validationSchema });

const name = ref('');
const email = ref('');
const password = ref('');

const submitForm = handleSubmit(async () => {
 try {
   const data = await userStore.signup(name.value, email.value, password.value);

    if(!data.errors){
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed up!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      navigateTo('/login');
    }else{
      Swal.fire({
        title: 'Error!',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Error!',
      text: (error as any).response.data.message,
      icon: 'error',
      confirmButtonText: 'Cool'
  })
  }
})
</script>

<style scoped>

</style>